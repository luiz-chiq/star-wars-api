import { useState } from 'react';
import Card from '../Card/Card';
import styles from './SearchPlanet.module.css'

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

  const handleDelete = () => {
    onDeletePlanet(foundPlanet!.name)
    setFoundPlanet(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label className={styles.label}>
          Pesquisar Planeta:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            />
        </label>
        <button className={styles.button} onClick={handleSearch}>Pesquisar</button>
      </div>

      {foundPlanet && (
        <Card title={foundPlanet.name} onDeletePlanet={handleDelete}/>
      )}
    </div>
  );
};

export default SearchPlanetComponent;
