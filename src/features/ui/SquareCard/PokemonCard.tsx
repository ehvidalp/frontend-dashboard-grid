import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../dashboard/types";
import AnimatedToggle from "../AnimatedToggle/AnimatedToggle";

interface PokemonCardProps {
  pokemon: Pokemon;
  isInCombat: boolean;
  showBorder?: boolean;
  handleToggleCombat: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({
  pokemon,
  isInCombat,
  showBorder = false,
  handleToggleCombat,
}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleCombat();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group w-full h-48 relative flex flex-col rounded-lg bg-zinc-800 cursor-pointer transform transition-transform duration-200 hover:scale-105 overflow-hidden md:max-w-64 ${
        isInCombat && showBorder ? "border-2 border-red-500" : ""
      }`}
    >
      <picture className="relative w-full h-5/6 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <img
          className="w-full h-full object-contain"
          src={pokemon.sprites.other.home.front_default}
          alt={pokemon.name}
        />
      </picture>

      <span className="h-1/6 relative text-center font-roboto-mono font-bold capitalize text-zinc-50">
        {pokemon.name}
      </span>

      <AnimatedToggle
        isSelected={isInCombat}
        handleToggle={handleToggleClick}
        className="z-10 px-4 opacity-100 group-hover:opacity-100 transition-opacity duration-200 group-hover:-mt-12"
      />
    </div>
  );
};

export default PokemonCard;
