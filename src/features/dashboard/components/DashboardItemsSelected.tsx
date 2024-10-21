import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { removeFromCombat } from "../dataDashboardSlice";
import PokemonCard from "../../ui/SquareCard/PokemonCard";
import { Pokemon } from "../types";

interface DashboardItemsSelectedProps {
  className?: string;
}

export default function DashboardItemsSelected({ className }: DashboardItemsSelectedProps) {
  const dispatch = useAppDispatch();
  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons);

  const handleToggleCombat = (pokemon: Pokemon) => {
    dispatch(removeFromCombat(pokemon)); 
  };

  return (
    <div className={`pt-6 px-2 flex flex-col justify-center items-center ${className}`}>
            
        <h1 className=" text-2xl font-roboto-mono text-zinc-300 text-center mb-10 px-4">
            {combatPokemons.length === 0 ? "No Pokémon selected for battle yet." : "Selected Pokémon for Battle"}
        </h1>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        {combatPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              isInCombat={true}
              handleToggleCombat={() => handleToggleCombat(pokemon)}
            />
        ))}
      </div>
    </div>
  );
}