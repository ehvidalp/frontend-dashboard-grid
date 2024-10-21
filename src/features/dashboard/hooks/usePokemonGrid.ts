import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchAndRemovePartialPokemons, addToCombat, removeFromCombat, selectAllPokemons } from "../dataDashboardSlice";
import { Pokemon } from '../types';

const MAX_COMBAT_POKEMONS = 6;
const ADD_POKEMONS_COUNT = 15;

export const usePokemonGrid = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectAllPokemons); 
  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons); 
  const status = useAppSelector((state) => state.pokemon.status);

  const [visibleCount, setVisibleCount] = useState(() => {
    return pokemons.length > 0 ? pokemons.length : ADD_POKEMONS_COUNT;
  });

  const hasFetchedInitial = useRef(false); 

  useEffect(() => {
    if (!hasFetchedInitial.current && pokemons.length === 0 && status !== 'loading-details') {
      dispatch(fetchAndRemovePartialPokemons(ADD_POKEMONS_COUNT)); 
      hasFetchedInitial.current = true;
    }
  }, [dispatch, pokemons.length, status]);

  const loadMorePokemons = useCallback(() => {
    if (status === 'succeeded') {
      setVisibleCount((prevCount) => prevCount + ADD_POKEMONS_COUNT);
      
      dispatch(fetchAndRemovePartialPokemons(ADD_POKEMONS_COUNT)); 
    }
  }, [dispatch, status]);

  const toggleCombat = (pokemon: Pokemon) => {
    const isInCombat = combatPokemons.some((p) => p.name === pokemon.name);
    if (isInCombat) {
      dispatch(removeFromCombat(pokemon)); 
      return;
    }
    
    if (combatPokemons.length < MAX_COMBAT_POKEMONS) {
      dispatch(addToCombat(pokemon)); 
    }
  };

  return {
    pokemons,
    combatPokemons,
    status,
    visibleCount,
    loadMorePokemons,
    toggleCombat,
    remainingPokemons: MAX_COMBAT_POKEMONS - combatPokemons.length,
  };
};