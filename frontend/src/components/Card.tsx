import axios from 'axios';
import { promises } from 'dns';
import { FC, MouseEvent } from 'react';

interface CardProps {
  title: string;
  onDeletePlanet: (title: string) => void;
}

const Card: FC<CardProps> = ({ title, onDeletePlanet }) => {


  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', margin: '16px', width: '300px' }}>
      <h2>{title}</h2>
      <button onClick={() => onDeletePlanet(title)}>Deletar</button>
    </div>
  );
};

export default Card;
