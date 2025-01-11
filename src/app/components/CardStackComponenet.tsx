import React, { useEffect, useState } from 'react';
import "../../../public/CardStack.css";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/product/`;

interface Card {
  imageUrl: string;
  altText: string;
}

interface CardStackProps {
  cards: Card[];
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex(prevIndex => (prevIndex + 1) % cards.length);
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    return () => {
      clearInterval(interval);
    };
  }, [cards]);
  
  
  return (
    <div className="card-stack">
      {cards.map((card, index) => (
        <div
          className={`card-stack-item ${index === currentCardIndex ? 'active' : ''}`}
          key={index}
        >
             {/* <div>{card}</div> */}
          <img src={`${BASE_URL}${card}`} style={{height:"50px", objectFit: 'cover'}} alt={card.altText} />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
