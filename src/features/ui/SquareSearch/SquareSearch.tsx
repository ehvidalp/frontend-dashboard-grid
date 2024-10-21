import { FC, useState } from 'react';

interface SquareSearchProps {
  onSearchChange: (searchValue: string) => void;
}

const SquareSearch: FC<SquareSearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="w-full">
      <input
        type="search"
        className="w-full px-4 py-2 rounded-lg focus:outline-none bg-zinc-500 font-roboto-mono"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SquareSearch;