import { FC } from "react";
import { Pokemon } from "../../dashboard/types";

interface PokemonCardProps {
    pokemon: Pokemon;
    isInCombat: boolean;
    handleToggleCombat: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, isInCombat, handleToggleCombat }) => {
  return (
    <picture>
        <img src={pokemon.url} alt={pokemon.name} />
        <span>{pokemon.name}</span>
        <button onClick={handleToggleCombat}>
            {isInCombat ? "Remove from Combat" : "Add to Combat"}
        </button>
    </picture>
  );
};

export default PokemonCard;
