import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getPartialPokemons } from "../dataDashboardSlice";
import DashboardGrid from "../components/DashboardGrid";

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
    <div>
      <DashboardGrid />
    </div>
  );
};

export default Dashboard;