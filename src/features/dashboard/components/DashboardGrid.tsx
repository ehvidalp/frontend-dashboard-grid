
import { usePokemonGrid } from "../hooks/usePokemonGrid";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import PokemonCard from "../../ui/SquareCard/PokemonCard";

const DashboardGrid = () => {
  const {
    pokemons,
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat
  } = usePokemonGrid();

  const { observe } = useIntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMorePokemons();
    }
  });

  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Failed to load data</p>}

        {pokemons.slice(0, visibleCount).map((pokemon, index) => {
          const isInCombat = combatPokemons.includes(pokemon.name);
          return (
            <div
              key={pokemon.name}
              ref={index === visibleCount - 1 ? observe : null}
            >
              <PokemonCard
                pokemon={pokemon}
                isInCombat={isInCombat}
                handleToggleCombat={() => toggleCombat(pokemon.name)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardGrid;