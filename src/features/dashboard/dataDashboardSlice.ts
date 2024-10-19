
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PokemonState, PokemonResponse, Pokemon } from './types';

const initialState: PokemonState = {
    pokemons: [],
    combatPokemons: [],
    totalPokemons: 0,
    offset: 0,
    status: 'idle',
};

export const getPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
    const { results } = await PokeApiService.getPokemons() as PokemonResponse;
    return results;
});

const handleFetchPokemonsError = (state: PokemonState) => {
    state.status = 'failed';
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToCombat: (state, action: PayloadAction<string>) => {
            if (!state.combatPokemons.includes(action.payload)) {
                state.combatPokemons.push(action.payload);
            }
        },
        removeFromCombat: (state, action: PayloadAction<string>) => {
            state.combatPokemons = state.combatPokemons.filter(
                (name) => name !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPokemons.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
                state.status = 'succeeded';
                state.pokemons = action.payload;
            })
            .addCase(getPokemons.rejected, handleFetchPokemonsError);
    },
});

export const { addToCombat, removeFromCombat } = pokemonSlice.actions;

export const selectAllPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectCombatPokemons = (state: RootState) => state.pokemon.combatPokemons;

import { createSelector } from 'reselect';
import PokeApiService from '../../api/PokeApiService';
export const selectIsPokemonInCombat = createSelector(
    [selectCombatPokemons, (_: RootState, name: string) => name],
    (combatPokemons, name) => combatPokemons.includes(name)
);

export default pokemonSlice.reducer;
