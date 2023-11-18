import { useState } from 'react';
import styles from './AddPlanet.module.css'

interface AddPlanetComponentProps {
    onSavePlanet: (planetName: string) => void;
}

const AddPlanetComponent: React.FC<AddPlanetComponentProps> = ({ onSavePlanet }) => {

  const [planetName, setPlanetName] = useState('');
  const [buttonText, setButtonText] = useState('Salvar Planeta');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSavePlanet = async () => {
    try {
      setIsLoading(true); // Ativa o estado de carregamento
      await  onSavePlanet(planetName);
      setPlanetName('');
    } catch (error) {
      console.error('Erro ao salvar planeta:', error);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento, independentemente do resultado
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Nome do Planeta:
        <input
          type="text"
          value={planetName}
          onChange={(e) => setPlanetName(e.target.value)}
          className={styles.input}
        />
      </label>
      <button className={styles.button} onClick={handleSavePlanet} disabled={isLoading}>
        {isLoading ? 'Carregando...' : buttonText}
      </button>
    </div>
  );
};

export default AddPlanetComponent;
