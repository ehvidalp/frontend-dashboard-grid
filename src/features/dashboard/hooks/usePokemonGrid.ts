import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchAndRemovePartialPokemons, addToCombat, removeFromCombat, selectAllPokemons } from "../dataDashboardSlice";
import { Pokemon } from '../types';

const MAX_COMBAT_POKEMONS = 6;
const ADD_POKEMONS_COUNT = 15;

export const usePokemonGrid = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectAllPokemons); // Pokémon en la store
  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons); // Pokémon en combate
  const status = useAppSelector((state) => state.pokemon.status); // Estado de la carga

  // Si hay Pokémon en la store, mostrar todos. Si no, mostrar 10.
  const [visibleCount, setVisibleCount] = useState(() => {
    return pokemons.length > 0 ? pokemons.length : ADD_POKEMONS_COUNT;
  });

  const hasFetchedInitial = useRef(false); 

  useEffect(() => {
    // Si no hay Pokémon en la store, hacer el fetch inicial
    if (!hasFetchedInitial.current && pokemons.length === 0 && status !== 'loading-details') {
      dispatch(fetchAndRemovePartialPokemons(ADD_POKEMONS_COUNT)); // Cargar los primeros 10 Pokémon
      hasFetchedInitial.current = true;
    }
  }, [dispatch, pokemons.length, status]);

  const loadMorePokemons = useCallback(() => {
    if (status === 'succeeded') {
      setVisibleCount((prevCount) => prevCount + ADD_POKEMONS_COUNT);
      dispatch(fetchAndRemovePartialPokemons(ADD_POKEMONS_COUNT)); // Cargar más Pokémon si es necesario
    }
  }, [dispatch, status]);

  const toggleCombat = (pokemon: Pokemon) => {
    const isInCombat = combatPokemons.some((p) => p.name === pokemon.name);
    if (isInCombat) {
      dispatch(removeFromCombat(pokemon)); // Remover de combate
      return;
    }
    
    if (combatPokemons.length < MAX_COMBAT_POKEMONS) {
      dispatch(addToCombat(pokemon)); // Añadir a combate
    }
  };

  return {
    pokemons,
    combatPokemons,
    status,
    visibleCount, // Muestra los Pokémon visibles
    loadMorePokemons, // Cargar más Pokémon cuando sea necesario
    toggleCombat, // Agregar o remover Pokémon del combate
    remainingPokemons: MAX_COMBAT_POKEMONS - combatPokemons.length, // Contador de Pokémon restantes para combate
  };
};