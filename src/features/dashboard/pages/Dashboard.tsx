import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getPartialPokemons } from "../dataDashboardSlice";
import DashboardGrid from "../components/DashboardGrid";
import PokeballIcon from '../../../assets/images/pokeball.png'
import DashboardItemsSelected from "../components/DashboardItemsSelected";
const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pokemon.status);
  const partialPokemons = useAppSelector((state) => state.pokemon.partialPokemons);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (status === "idle" && !hasFetched.current) {
      dispatch(getPartialPokemons());
      hasFetched.current = true;
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load data</p>;
  }

  if (partialPokemons.length === 0) {
    return <p>No Pokémon available</p>;
  }

  return (
    <section className="grid grid-rows-[auto_1fr] grid-cols-[65%_35%] h-screen">
    <header className="col-span-2 bg-zinc-950 sticky top-0 z-50">
      <img className="w-16 h-16 object-contain mx-auto py-4" src={PokeballIcon} alt="pokeball" />
    </header>
    <DashboardGrid className="overflow-auto" />
    <DashboardItemsSelected className="overflow-auto" />
  </section>
  );
};

export default Dashboard;