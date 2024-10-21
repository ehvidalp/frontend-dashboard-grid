import { FC } from "react";
import { Pokemon } from "../../dashboard/types";
import AnimatedToggle from "../AnimatedToggle/AnimatedToggle";

interface PokemonCardProps {
  pokemon: Pokemon;
  isInCombat: boolean;
  handleToggleCombat: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  isInCombat,
  handleToggleCombat,
}) => {
  console.log("pokemon", pokemon);
  return (
    <div
      className={`group w-full h-48 relative flex flex-col rounded-lg bg-zinc-800 cursor-pointer transform transition-transform duration-200 hover:scale-105 overflow-hidden md:max-w-64 ${
        isInCombat ? "border-2 border-red-500" : ""
      }`}
    >
      <picture className="w-full h-5/6 group-hover:scale-125 group-hover:-translate-y-1 z-0">
        <img
          className="w-full h-full object-contain"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
      </picture>

      {/* <span className="absolute inset-0 flex items-end justify-center text-6xl font-bold text-zinc-400 opacity-10 capitalize font-roboto-mono whitespace-nowrap overflow-hidden">
        {pokemon.name}
      </span> */}
      {/* <div className="relative h-2/6 flex items-center justify-center z-20 overflow-hidden"> */}
      <span className="h-1/6 relative text-center font-roboto-mono font-bold capitalize text-zinc-50">
        {pokemon.name}
      </span>
      {/* </div> */}
      <AnimatedToggle
        isSelected={isInCombat}
        handleToggle={handleToggleCombat}
        className="absolute -mt-10 px-4 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="flex flex-col items-center justify-center bg-white bg-opacity-75 rounded-full p-2 shadow-md"
          onClick={handleToggleCombat}
        >
          <span className="text-xs text-gray-700">
            {isInCombat ? "Swipe up to remove" : "Swipe up to add"}
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default PokemonCard;
