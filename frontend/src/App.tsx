import axios from 'axios';
import styles from './App.module.css';
import AddPlanetComponent from './components/AddPlanet/AddPlanet';
import Card from './components/Card/Card'
import { useEffect, useState } from 'react';
import SearchPlanetComponent from './components/SearchPlanet/SearchPlanet';

function App() {

  const [planets, setPlanets] = useState<Planet[]>([]);

  interface Planet {
    name: string;
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get('http://localhost:3004/planets');
      setPlanets(response.data);

    } catch (error) {
      console.error('Erro ao buscar planetas:', error);
    }
  };
  
  const handleSavePlanet = async (planetName: string) => {
    try {
      const response = await axios.post('http://localhost:3004/planet', { planet: planetName });
      
      if (response.data.message === 'Planeta adicionado com sucesso') {
      } else {
        console.error('Erro ao adicionar planeta:', response.data.error);
        alert('Erro ao adicionar planeta!');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      alert('Erro na requisição POST!');
    }
    fetchPlanets();
  };
  

  const handleDeletePlanet = async (title: string) => {
    try {
      const response = await axios.delete(`http://localhost:3004/planet/${title}`);
      if (response.data.message === 'Planeta removido com sucesso') {
        console.log('Planeta removido com sucesso:', response.data);
      } else {
        console.error('Erro ao remover planeta:', response.data.error);
        alert('Erro ao remover planeta!');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      alert('Erro na requisição POST!');
    }
    fetchPlanets();
  };
  
  return (
    <>
      <div className={styles.container}> 
        <div className={styles.column}>
          <AddPlanetComponent onSavePlanet={handleSavePlanet} />
          {planets.map((planet, index) => (
            <Card key={index} title={planet.name} onDeletePlanet={handleDeletePlanet} />
            ))}
        </div>
        <div className={styles.column}>
          <SearchPlanetComponent planets={planets} onDeletePlanet={handleDeletePlanet}/>
        </div>
      </div>
            <div className={styles.background}/>
    </>
  );
}

export default App;