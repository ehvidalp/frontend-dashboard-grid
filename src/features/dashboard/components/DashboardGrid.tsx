
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { addToCombat, removeFromCombat, selectAllPokemons } from '../dataDashboardSlice';


const DashboardGrid = () => {
    const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectAllPokemons);
  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons);
  const status = useAppSelector((state) => state.pokemon.status);
    
    return (
        <div>
        <h1 className="text-2xl font-bold bg-red-500">Dashboard</h1>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Failed to load Pokémon data</p>}
        {status === 'succeeded' && (
          <div>
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
                <div key={pokemon.name}>
                  <span>{pokemon.name}</span>
                  <button onClick={handleToggleCombat}>
                    {isInCombat ? 'Remove from Combat' : 'Add to Combat'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
};

export default DashboardGrid;