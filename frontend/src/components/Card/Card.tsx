import { FC } from 'react';
import styles from './Card.module.css'

interface CardProps {
  title: string;
  onDeletePlanet: (title: string) => void;
}

const Card: FC<CardProps> = ({ title, onDeletePlanet }) => {


  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <button className={styles.button} onClick={() => onDeletePlanet(title)}>Deletar</button>
    </div>
  );
};

export default Card;
