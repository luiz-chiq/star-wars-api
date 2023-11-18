import React, { useState } from 'react';
import axios from 'axios';

interface AddPlanetComponentProps {
    onSavePlanet: (planetName: string) => void;
}

const AddPlanetComponent: React.FC<AddPlanetComponentProps> = ({ onSavePlanet }) => {

  const [planetName, setPlanetName] = useState<string>('');
  
  
  
  const handleSavePlanet = () => {
    onSavePlanet(planetName);
    setPlanetName('');
  };

  return (
    <div>
      <label>
        Nome do Planeta:
        <input
          type="text"
          value={planetName}
          onChange={(e) => setPlanetName(e.target.value)}
        />
      </label>
      <button onClick={handleSavePlanet}>Salvar Planeta</button>
    </div>
  );
};

export default AddPlanetComponent;
