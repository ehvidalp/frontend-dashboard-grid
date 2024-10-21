import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { usePokemonGrid } from "../hooks/usePokemonGrid";
import { setSearchTerm, selectFilteredPokemons, selectPartialPokemons } from "../dataDashboardSlice";
import PokemonCard from "../../ui/SquareCard/PokemonCard";
import SquareSearch from "../../ui/SquareSearch/SquareSearch";

interface DashboardGridProps {
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  
  const {
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat,
    remainingPokemons
  } = usePokemonGrid();

  const pokemons = useAppSelector(selectFilteredPokemons);
  const partialPokemons = useAppSelector(selectPartialPokemons); 

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = scrollPositionRef.current;
    }

    return () => {
      if (container) {
        scrollPositionRef.current = container.scrollTop;
      }
    };
  }, []);

  useEffect(() => {
    if (pokemons.length === 0 && partialPokemons.length > 0) {
      loadMorePokemons();
    }
  }, [pokemons.length, partialPokemons.length, loadMorePokemons]);

  const handleSearch = (searchValue: string) => {
    dispatch(setSearchTerm(searchValue)); 
  };

  return (
    <section
      ref={scrollContainerRef}
      className={`container mx-auto px-6 pb-4 ${className}`}
    >
      <h1 className="sticky top-0 z-40 bg-zinc-950 text-4xl font-bold font-roboto-mono text-zinc-50 pb-4 pt-16">
        {remainingPokemons > 0
          ? `Select ${remainingPokemons} Pokémon to battle`
          : "You have selected 6 Pokémon"}
      </h1>
      
      <SquareSearch onSearchChange={handleSearch} /> 

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Failed to load data</p>}

        {pokemons.slice(0, visibleCount).map((pokemon) => {
          const isInCombat = combatPokemons.some((p) => p.name === pokemon.name);
          return (
            <div key={pokemon.name}>
              <PokemonCard
                pokemon={pokemon}
                isInCombat={isInCombat}
                showBorder={true}
                handleToggleCombat={() => toggleCombat(pokemon)}
              />
            </div>
          );
        })}
      </div>

      {partialPokemons.length > 0 && status !== "loading-details" && (
        <div className="text-center mt-4">
          <button
            className="w-full bg-zinc-400 text-white py-2 px-4 rounded hover:bg-red-500 font-roboto-mono"
            onClick={loadMorePokemons} 
          >
            Load More
          </button>
        </div>
      )}

      {pokemons.length >= 150 && (
        <p className="text-center text-green-500 mt-4">All 150 Pokémon have been loaded!</p>
      )}
    </section>
  );
};

export default DashboardGrid;