"use client";

import React, { useState, useEffect } from "react";

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('carditems'));
    if (savedCards) {
      setCards(savedCards);
    }
  }, []);

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('carditems', JSON.stringify(updatedCards));
    window.location.reload();
  };

  const toggleReturnCard = (id) => {
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, flipped: !card.flipped } : card
    );
    setCards(updatedCards);
    localStorage.setItem('carditems', JSON.stringify(updatedCards));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            onClick={() => toggleReturnCard(card.id)}
            key={card.id}
            className={`bg-white shadow-md rounded-lg p-4 transition-transform duration-500 cursor-pointer
              ${card.flipped ? "rotate-y-180" : ""}`}
          >
            <div className={`h-full flex flex-col justify-between ${card.flipped ? "rotate-y-180" : ""}`}>
              <p className="text-sm font-medium text-black text-center mb-3">
                {card.flipped ? card.back : card.front}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCard(card.id);
                }}
                className="w-full bg-blue-600 text-white py-2 px-3 rounded-md 
                  text-sm transition-colors duration-200"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;