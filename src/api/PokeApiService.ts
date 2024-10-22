import HttpClient from "./HttpApiClient";
class PokeApiService {
    private apiPokeClient: HttpClient;
    
    constructor() {
        this.apiPokeClient = new HttpClient();
    }

    async getPartialPokemons(limit: number = 150, offset: number = 0) {
        try {
            const response = await this.apiPokeClient.get(`/pokemon?limit=${limit}&offset=${offset}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getDetailsPokemonFromUrl(url: string) {
        try {
            const customApiPokeClient = new HttpClient(url);
            const response = await customApiPokeClient.get();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async searchPokemon(name: string) {
        try {
            const response = await this.apiPokeClient.get(`/pokemon/${name.toLowerCase()}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new PokeApiService();