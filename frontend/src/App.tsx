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
  
  const handleSavePlanet = async (planetName: string) => {
    try {
      const response = await axios.post('http://localhost:3004/planet', { planet: planetName });
      
      if (response.data.message === 'Planeta adicionado com sucesso') {
        alert("Planeta adicionado com sucesso!")
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
        alert('Planeta removido!');
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
    <AddPlanetComponent onSavePlanet={handleSavePlanet} />
    {planets.map((planet, index) => (
        <Card key={index} title={planet.name} onDeletePlanet={handleDeletePlanet} />
      ))}
    </>
  );
}

export default App;