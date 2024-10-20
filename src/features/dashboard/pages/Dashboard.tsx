import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getPokemons } from "../dataDashboardSlice";
import DashboardGrid from "../components/DashboardGrid";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.pokemon.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPokemons());
    }
  }, [status, dispatch]);

  return (
    <div>
      <DashboardGrid />
    </div>
  );
};

export default Dashboard;
