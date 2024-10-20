import { FC } from "react";
import { Pokemon } from "../../dashboard/types";

interface PokemonCardProps {
    pokemon: Pokemon;
    isInCombat: boolean;
    handleToggleCombat: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <picture>
        <img src={pokemon.url} alt={pokemon.name} />
        <span>{pokemon.name}</span>
    </picture>
  );
};

export default PokemonCard;
