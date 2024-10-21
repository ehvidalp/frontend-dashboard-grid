import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { usePokemonGrid } from "../hooks/usePokemonGrid";
import {
  searchPokemonByName,
  selectSearchResults,
  selectFilteredPokemons,
  selectPartialPokemons,
  clearSearchResults 
} from "../dataDashboardSlice";
import PokemonCard from "../../ui/SquareCard/PokemonCard";
import SquareSearch from "../../ui/SquareSearch/SquareSearch";
import { useDebounce } from "../../../hooks/useDebounce";

interface DashboardGridProps {
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat,
    remainingPokemons,
  } = usePokemonGrid();

  const pokemons = useAppSelector(selectFilteredPokemons);
  const searchResults = useAppSelector(selectSearchResults);
  const partialPokemons = useAppSelector(selectPartialPokemons);

  useEffect(() => {
    if (!debouncedSearchTerm && pokemons.length === 0 && partialPokemons.length > 0 && status !== "loading") {
      loadMorePokemons();
    }
  }, [debouncedSearchTerm, pokemons.length, partialPokemons.length, loadMorePokemons, status]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchPokemonByName(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchResults()); 
    };
  }, [dispatch]);

  const handleSearch = useCallback((searchValue: string) => {
    setSearchTerm(searchValue);
  }, []);

  const renderPokemonCards = useCallback(() => {
    const pokemonList = debouncedSearchTerm ? searchResults : pokemons;

    if (debouncedSearchTerm && searchResults.length === 0) {
      return <p className="text-center text-red-500 mt-4">No Pokémon found for "{debouncedSearchTerm}"</p>;
    }

    return pokemonList.slice(0, visibleCount).map((pokemon) => {
      const isInCombat = combatPokemons.some((p) => p.name === pokemon.name);
      return (
        <div key={pokemon.name}>
          <PokemonCard
            pokemon={pokemon}
            isInCombat={isInCombat}
            enableNavigation={true}
            showBorder={true}
            handleToggleCombat={() => toggleCombat(pokemon)}
          />
        </div>
      );
    });
  }, [debouncedSearchTerm, searchResults, pokemons, visibleCount, combatPokemons, toggleCombat]);

  return (
    <section className={`container mx-auto px-6 pb-4 ${className}`}>
      <h1 className="sticky top-14 z-40 bg-zinc-950 text-4xl font-bold font-roboto-mono text-zinc-50 pb-4 pt-16">
        {remainingPokemons > 0
          ? `Select ${remainingPokemons} Pokémon to battle`
          : "You have selected 6 Pokémon"}
      </h1>

      <SquareSearch
        onSearchChange={handleSearch}
        className="sticky top-44 z-50 mb-4 bg-zinc-950 py-4"
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {status === "loading" && <p>Loading...</p>}
        {renderPokemonCards()}
      </div>

      {partialPokemons.length > 0 && status !== "loading-details" && !debouncedSearchTerm && (
        <div className="text-center mt-4">
          <button
            className="w-full bg-zinc-400 text-white py-2 px-4 rounded hover:bg-red-500 font-roboto-mono"
            onClick={loadMorePokemons}
          >
            Load More
          </button>
        </div>
      )}

      {pokemons.length >= 150 && !debouncedSearchTerm && (
        <p className="text-center text-green-500 mt-4">
          All 150 Pokémon have been loaded!
        </p>
      )}
    </section>
  );
};

export default DashboardGrid;