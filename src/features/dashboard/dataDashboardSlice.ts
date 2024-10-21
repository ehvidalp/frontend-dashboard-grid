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

        if (state.pokemon.partialPokemons.length > 0) {
            dispatch(removePartialPokemons(count));
        }

        return details;
    }
);

export const searchPokemonByName = createAsyncThunk(
    'pokemon/searchPokemonByName',
    async (name: string) => {
        try {
            const result = await PokeApiService.searchPokemon(name);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Pokemon not found");
        }
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
    searchTerm: '',
    searchResults: [],
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
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload; 
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
                state.pokemons = [...state.pokemons, ...action.payload as Pokemon[]];
            })
            .addCase(fetchAndRemovePartialPokemons.rejected, handleFetchPokemonsError)
            .addCase(searchPokemonByName.fulfilled, (state, action: PayloadAction<unknown>) => {
                state.status = 'succeeded';
                state.searchResults = [action.payload as Pokemon];
            })
            .addCase(searchPokemonByName.rejected, handleFetchPokemonsError);
    },
});

export const { addToCombat, removeFromCombat, removePartialPokemons, setSearchTerm } = pokemonSlice.actions;

export const selectAllPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectCombatPokemons = (state: RootState) => state.pokemon.combatPokemons;
export const selectPartialPokemons = (state: RootState) => state.pokemon.partialPokemons;
export const selectSearchTerm = (state: RootState) => state.pokemon.searchTerm;
export const selectSearchResults = (state: RootState) => state.pokemon.searchResults;

export const selectFilteredPokemons = createSelector(
    [selectAllPokemons, selectSearchTerm],
    (pokemons, searchTerm) => {
        if (!searchTerm) return pokemons;
        return pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
);

export const selectIsPokemonInCombat = createSelector(
    [selectCombatPokemons, (_: RootState, name: string) => name],
    (combatPokemons, name) => combatPokemons.some(pokemon => pokemon.name === name)
);

export default pokemonSlice.reducer;