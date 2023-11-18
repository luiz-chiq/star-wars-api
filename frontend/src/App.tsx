import axios from 'axios';
import './App.css';
import AddPlanetComponent from './components/AddPlanet';
import Card from './components/Card'
import { useEffect, useState } from 'react';
import SearchPlanetComponent from './components/SearchPlanet';

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
      console.log("a")
    } catch (error) {
      console.error('Erro ao buscar planetas:', error);
    }
  };

  
  return (
  <>
    {planets.map((planet, index) => (
        <Card key={index} title={planet.name}/>
      ))}
    </>
  );
}

export default App;