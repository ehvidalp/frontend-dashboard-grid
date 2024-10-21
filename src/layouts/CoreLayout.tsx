import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PokeballIcon from "../assets/images/pokeball.png";

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout: FC<CoreLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnRoot = location.pathname === "/";
  return (
    <>
      <header className="col-span-2 bg-zinc-950 sticky top-0 z-50 flex items-center justify-between px-4 py-4">
        {!isOnRoot && (
          <button
            className="text-zinc-50 font-roboto-mono text-s px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
        )}
        <img
          className="w-16 h-16 object-contain mx-auto"
          src={PokeballIcon}
          alt="pokeball"
        />
      </header>
      <main className="flex flex-col w-full h-auto bg-neutral-950">
        {children}
      </main>
    </>
  );
};

export default CoreLayout;
