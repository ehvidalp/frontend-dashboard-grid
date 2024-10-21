import { FC } from "react";
import pokeballIcon from '../../../assets/images/pokeball.png'

interface AnimatedToggleProps {
  handleToggle: (e: React.MouseEvent) => void;
  isSelected: boolean;
  className?: string;
}

const AnimatedToggle: FC<AnimatedToggleProps> = ({
  handleToggle,
  isSelected,
  className,
}) => {
  return (
    <div className={`relative w-full mt-4 rounded-md border h-10 p-1 bg-zinc-200 ${className}`}>
      <div className="relative w-full h-full flex items-cente font-roboto-mono text-sm">
        <div
          onClick={handleToggle}
          className="w-full flex justify-center text-gray-400 cursor-pointer"
        >
          <button>Remove</button>
        </div>
        <div
          onClick={handleToggle}
          className="w-full flex justify-center text-gray-500 cursor-pointer"
        >
          <button>Add</button>
        </div>
      </div>

      <span
        className={`bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute ${
          !isSelected
            ? "left-1"
            : "left-1/2 -ml-1 bg-red-300"
        }`}
      >
        <img className="w-4 h-4 object-contain" src={pokeballIcon} alt="pokeball" />
      </span>
    </div>
  );
};

export default AnimatedToggle;
