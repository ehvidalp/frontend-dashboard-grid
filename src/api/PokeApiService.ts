import { ApiClient } from "../types";
import apiClient from "./ApiClient";

class PokeApiService {
    private apiPokeClient: ApiClient;
    
    constructor() {
        this.apiPokeClient = apiClient;
    }

    async getPokemons(limit: number = 150, offset: number = 0) {
        try {
            const response = await this.apiPokeClient.get(`/pokemon?limit=${limit}&offset=${offset}`);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new PokeApiService();