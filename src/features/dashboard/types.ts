export interface Pokemon {
    name: string;
    url: string;
    sprites: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
    }
}

export interface PokemonResponse {
    count: number;
    results: Pokemon[];
}

export interface PokemonState {
    pokemons: Pokemon[];
    combatPokemons: string[];
    partialPokemons: Pokemon[];
    totalPokemons: number;
    offset: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'loading-details';
}
