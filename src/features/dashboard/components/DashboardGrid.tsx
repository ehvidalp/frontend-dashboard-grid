import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import PokemonCard from "../../ui/SquareCard/PokemonCard";
import {
  addToCombat,
  removeFromCombat,
  selectAllPokemons,
} from "../dataDashboardSlice";

const DashboardGrid = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectAllPokemons);
  const combatPokemons = useAppSelector(
    (state) => state.pokemon.combatPokemons
  );
  const status = useAppSelector((state) => state.pokemon.status);

  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {status === "loading" && <p>Loading...</p>}

        {pokemons.map((pokemon) => {
          const isInCombat = combatPokemons.includes(pokemon.name);

          const handleToggleCombat = () => {
            if (isInCombat) {
              dispatch(removeFromCombat(pokemon.name));
              return;
            }
            dispatch(addToCombat(pokemon.name));
          };

          return (
            <PokemonCard
              pokemon={pokemon}
              isInCombat={isInCombat}
              handleToggleCombat={handleToggleCombat}
            />
            // <div
            //   className="bg-blue-500 text-white p-4 rounded shadow"
            //   key={pokemon.name}
            // >
            //   <span>{pokemon.name}</span>
            //   <button onClick={handleToggleCombat}>
            //     {isInCombat ? "Remove from Combat" : "Add to Combat"}
            //   </button>
            // </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardGrid;
