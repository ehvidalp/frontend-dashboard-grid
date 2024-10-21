import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PokemonState, PokemonResponse, Pokemon } from './types';
import { createSelector } from 'reselect';
import PokeApiService from '../../api/PokeApiService';

const getPokemonDetails = async (pokemons: Pokemon[], count: number) => {
    const partialPokemonsToProcess = pokemons.slice(0, count);
    const detailsPromises = partialPokemonsToProcess.map((pokemon) =>
        PokeApiService.getDetailsPokemonFromUrl(pokemon.url)
    );
    return await Promise.all(detailsPromises);
};

export const getPartialPokemons = createAsyncThunk('pokemon/getPartialPokemons', async () => {
    const { results } = await PokeApiService.getPartialPokemons() as PokemonResponse;
    return results;
});

export const fetchAndRemovePartialPokemons = createAsyncThunk(
    'pokemon/getDetailPartialPokemonsAndRemovePartial',
    async (count: number, { getState, dispatch }) => {
        const state = getState() as RootState;
        const details = await getPokemonDetails(state.pokemon.partialPokemons, count);

        // Dispatch an action to remove the processed partial pokemons
        dispatch(removePartialPokemons(count));

        return details;
    }
);

const handleFetchPokemonsError = (state: PokemonState) => {
    state.status = 'failed';
};

const initialState: PokemonState = {
    combatPokemons: [],
    partialPokemons: [],
    pokemons: [],
    totalPokemons: 0,
    offset: 0,
    status: 'idle',
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToCombat: (state, action: PayloadAction<Pokemon>) => {
            if (!state.combatPokemons.some(pokemon => pokemon.name === action.payload.name)) {
                state.combatPokemons.push(action.payload);
            }
        },
        removeFromCombat: (state, action: PayloadAction<Pokemon>) => {
            state.combatPokemons = state.combatPokemons.filter(
                (pokemon) => pokemon.name !== action.payload.name
            );
        },
        removePartialPokemons: (state, action: PayloadAction<number>) => {
            state.partialPokemons = state.partialPokemons.slice(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPartialPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPartialPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.status = 'succeeded';
                state.partialPokemons = action.payload;
            })
            .addCase(getPartialPokemons.rejected, handleFetchPokemonsError)
            .addCase(fetchAndRemovePartialPokemons.pending, (state) => {
                state.status = 'loading-details';
            })
            .addCase(fetchAndRemovePartialPokemons.fulfilled, (state, action: PayloadAction<unknown[]>) => {
                state.status = 'succeeded';
                state.pokemons = [...state.pokemons, ...(action.payload as Pokemon[])];
            })
            .addCase(fetchAndRemovePartialPokemons.rejected, handleFetchPokemonsError);
    },
});

export const { addToCombat, removeFromCombat, removePartialPokemons } = pokemonSlice.actions;

export const selectAllPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectCombatPokemons = (state: RootState) => state.pokemon.combatPokemons;
export const selectPartialPokemons = (state: RootState) => state.pokemon.partialPokemons;

export const selectIsPokemonInCombat = createSelector(
    [selectCombatPokemons, (_: RootState, name: string) => name],
    (combatPokemons, name) => combatPokemons.some(pokemon => pokemon.name === name)
);

export default pokemonSlice.reducer;