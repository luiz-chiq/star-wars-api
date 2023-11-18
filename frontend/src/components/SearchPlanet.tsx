import React, { useEffect, useState } from 'react';
import Card from './Card';

interface SearchPlanetComponentProps {
  planets: Planet[];
  onDeletePlanet: (title: string) => void;
}

interface Planet {
  name: string;
}

const SearchPlanetComponent: React.FC<SearchPlanetComponentProps> = ({ planets, onDeletePlanet }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [foundPlanet, setFoundPlanet] = useState<Planet | null>(null);

  const handleSearch = () => {
    const found = planets.find(planet => planet.name.toLowerCase() === searchTerm.toLowerCase());

    setFoundPlanet(found || null);
  };

  return (
    <div>
      <label>
        Pesquisar Planeta:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Pesquisar</button>

      {foundPlanet && (
        <Card title={foundPlanet.name} onDeletePlanet={onDeletePlanet}/>
      )}
    </div>
  );
};

export default SearchPlanetComponent;
