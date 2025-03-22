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
    window.location.reload()
  };


  const toggleReturnCard = (id) => {
    const updatedCards = cards.map(card => 
      card.id === id ? { ...card, flipped: !card.flipped } : card
    );
    setCards(updatedCards);
    localStorage.setItem('carditems', JSON.stringify(updatedCards));

  };
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 cursor-pointer">
      {cards.map((card, index) => (
        <div
          onClick={() => toggleReturnCard(card.id)}
          key={card.id}
          className={`"bg-white shadow-md transition-transform duration-600 cursor-pointer rounded-lg p-2 text-center ${card.flipped ? "rotate-y-360" : ""} "`}
          
        >
          <p className="text-sm font-medium   text-gray-700 rotate-y-360">{card.flipped ? card.back  : card.front }</p>
          <button 
           onClick={(e) => {e.stopPropagation(); handleDeleteCard(card.id);}}
            className="mt-15 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700  "
          >
            Видалити
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardList;