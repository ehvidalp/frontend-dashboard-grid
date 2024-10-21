export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: PokemonSprite;
    types: PokemonType[];
    stats: PokemonStat[];
}

export interface PokemonType {
    name: string;
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    }
}
export interface PokemonSprite {
    other: {
        home: {
            front_default: string;
        }
    }
}

export interface PokemonResponse {
    count: number;
    results: Pokemon[];
}

export interface PokemonState {
    pokemons: Pokemon[];
    combatPokemons: Pokemon[];
    partialPokemons: Pokemon[];
    totalPokemons: number;
    offset: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'loading-details';
    searchTerm: string;
    searchResults: Pokemon[];
}