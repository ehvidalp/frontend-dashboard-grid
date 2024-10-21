import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { Pokemon } from "../../dashboard/types";
import AnimatedToggle from "../../ui/AnimatedToggle/AnimatedToggle"; // Importamos el componente AnimatedToggle
import { addToCombat, removeFromCombat } from "../../dashboard/dataDashboardSlice"; // Acciones para manejar el combate
import DashboardItemsSelected from "../../dashboard/components/DashboardItemsSelected";

const ItemDescription = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const navigate = useNavigate(); // Hook para la redirección
  const dispatch = useAppDispatch(); // Para manejar el dispatch de acciones
  const [isSelected, setIsSelected] = useState(false); // Estado para manejar el toggle
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null); // Estado para guardar el Pokémon

  const pokemon = useAppSelector((state) =>
    state.pokemon.pokemons.find((pokemon) => pokemon.id === Number(id))
  );

  const combatPokemons = useAppSelector((state) => state.pokemon.combatPokemons);

  // Redirigir al usuario si el Pokémon no existe y guardar el Pokémon si lo encuentra
  useEffect(() => {
    if (!pokemon) {
      navigate("/"); // Redirigir a la ruta raíz si no encuentra el Pokémon
    } else {
      setSelectedPokemon(pokemon); // Guardar el Pokémon en el estado si lo encuentra
      setIsSelected(combatPokemons.some((p) => p.id === pokemon.id)); // Verificar si está en combate
    }
  }, [pokemon, navigate, combatPokemons]);

  // Función para manejar el cambio de estado del toggle
  const handleToggle = () => {
    if (!selectedPokemon) return;

    if (isSelected) {
      dispatch(removeFromCombat(selectedPokemon));
    } else {
      dispatch(addToCombat(selectedPokemon));
    }
    setIsSelected(!isSelected); // Cambiar el estado del toggle
  };

  // Si no hay Pokémon o se está redirigiendo, no renderizamos nada
  if (!selectedPokemon) {
    return null;
  }

  // Renderizar el Pokémon guardado en el estado
  return (
    <section className="grid grid-rows-[auto_1fr] grid-cols-[65%_35%] h-screen">
        <div className="flex flex-col items-center justify-center w-full h-full">
      <picture>
        <img src={selectedPokemon.sprites.other.home.front_default} alt={selectedPokemon.name} />
      </picture>
      <section className="relative w-full flex flex-col items-center justify-center h-32">
        <span className="absolute inset-0 flex justify-center items-center text-6xl font-roboto-mono font-bold capitalize text-zinc-400 opacity-20">
          {selectedPokemon.name}
        </span>
        <span className="relative text-2xl text-center font-roboto-mono font-bold capitalize text-zinc-50 mt-4">
          {selectedPokemon.name}
        </span>
      </section>

      <section>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
          {selectedPokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="mb-2">
              <span className="capitalize text-zinc-300 font-roboto-mono">
                {stat.stat.name}: {stat.base_stat}
              </span>
              <div className="w-full bg-zinc-500 rounded-lg h-4 mt-1">
                <div
                  className="bg-red-500 h-4 rounded-lg"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>


      {/* Componente AnimatedToggle */}
      <section className="my-4 w-full flex justify-center max-w-sm">
        <AnimatedToggle
          isSelected={isSelected}
          handleToggle={handleToggle} // Función que maneja el toggle
        />
      </section>
    </div>
    <DashboardItemsSelected className="overflow-auto" />
  </section>

  );
};

export default ItemDescription;