import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchAndRemovePartialPokemons, addToCombat, removeFromCombat, selectAllPokemons } from "../dataDashboardSlice";

export const usePokemonGrid = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectAllPokemons);
  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons);
  const status = useAppSelector((state) => state.pokemon.status);
  const [visibleCount, setVisibleCount] = useState(10);
  const hasFetchedInitial = useRef(false); 

  // Cargar los primeros Pokémon al montar
  useEffect(() => {
    if (!hasFetchedInitial.current && pokemons.length === 0 && status !== 'loading') {
      dispatch(fetchAndRemovePartialPokemons(10));
      hasFetchedInitial.current = true;
    }
  }, [dispatch, pokemons.length, status]);

  const loadMorePokemons = useCallback(() => {
    if (status === 'succeeded') {
      setVisibleCount((prevCount) => prevCount + 10);
      dispatch(fetchAndRemovePartialPokemons(10));
    }
  }, [dispatch, status]);

  const toggleCombat = (pokemonName: string) => {
    if (combatPokemons.includes(pokemonName)) {
      dispatch(removeFromCombat(pokemonName));
    } else {
      dispatch(addToCombat(pokemonName));
    }
  };

  return {
    pokemons,
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat,
  };
};