import React, { useEffect, useState } from "react";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 5; // Total number of cards
  const visibleCards = 3; // Number of cards to display at once

  const cards = [
    {
      id: 1,
      content: "Kas1",
      limit: "100USDT to 1.000USDT",
      monthly: "12%",
      daily: "0.40%",
    },
    {
      id: 2,
      content: "Kas2",
      limit: "1.000USDT to 5.000USDT",
      monthly: "15%",
      daily: "0.50%",
    },
    {
      id: 3,
      content: "Kas3",
      limit: "5.000USDT to 10.000USDT",
      monthly: "18%",
      daily: "0.60%",
    },
    {
      id: 4,
      content: "Kas4",
      limit: "10.000USDT to 50.000USDT",
      monthly: "20%",
      daily: "0.67%",
    },
    {
      id: 5,
      content: "Kas5",
      limit: "50.000USDT to 100.000USDT",
      monthly: "24%",
      daily: "0.80%",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const slideStyle = {
    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <div className="slider-container">
      <div className="slider" style={slideStyle}>
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <p>
              Mining package <br /> {card.content}
            </p>
            <p>
              Mining limit <br /> {card.limit}
            </p>
            <p>
              Monthly reward <br /> {card.monthly}
            </p>
            <p>
              Daily reward <br /> {card.daily}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
