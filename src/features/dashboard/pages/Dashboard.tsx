import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getPartialPokemons } from "../dataDashboardSlice";
import DashboardGrid from "../components/DashboardGrid";

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

  if (partialPokemons.length < 0) {
    return <p>No Pokémon available</p>;
  }

  return (
    <section className="grid grid-rows-[auto_1fr] relative grid-cols-[65%_35%]">
      <DashboardGrid className="overflow-auto" />
      <DashboardItemsSelected className="overflow-hidden h-screen sticky top-0 " />
    </section>
  );
};

export default Dashboard;