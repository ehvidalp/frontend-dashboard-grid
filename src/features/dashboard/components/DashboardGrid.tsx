import { usePokemonGrid } from "../hooks/usePokemonGrid";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import PokemonCard from "../../ui/SquareCard/PokemonCard";

interface DashboardGridProps {
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ className }) => {
  const {
    pokemons,
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat,
    remainingPokemons
  } = usePokemonGrid();

  const { observe } = useIntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMorePokemons();
    }
  });

  return (
    <section className={`container mx-auto overflow-auto h-ful px-6 ${className}`}>
      <h1 className="sticky top-0 z-50 bg-zinc-950 text-4xl font-bold font-roboto-mono text-zinc-50 pb-4 pt-16">
        {remainingPokemons > 0
          ? `Select ${remainingPokemons} Pokémon to battle`
          : "You have selected 6 Pokémon"}
      </h1>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Failed to load data</p>}

        {pokemons.slice(0, visibleCount).map((pokemon, index) => {
          const isInCombat = combatPokemons.some((p) => p.name === pokemon.name);
          return (
            <div
              key={pokemon.name}
              ref={index === visibleCount - 1 ? observe : null}
            >
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
    </section>
  );
};

export default DashboardGrid;