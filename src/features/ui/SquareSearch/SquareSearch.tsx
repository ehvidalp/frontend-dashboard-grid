import { FC, useState } from 'react';

interface SquareSearchProps {
  onSearchChange: (searchValue: string) => void;
  className?: string;
}

const SquareSearch: FC<SquareSearchProps> = ({ onSearchChange, className }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        type="search"
        className="w-1/2 px-4 py-2 rounded-lg focus:outline-none bg-zinc-700 font-roboto-mono"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SquareSearch;