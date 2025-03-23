"use client";

import React, { useEffect, useState } from "react";
import CardList from "..//Cardlist/Cardllist";

const Home = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [cards, setCards] = useState([]); 


  useEffect(() => {
    const savedCards = localStorage.getItem("carditems");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem("carditems", JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = () => {
    if (front.trim() === "" || back.trim() === "") {
      alert("Заповни обидва поля");
      return;
    }

    const newCard = {
      id: Date.now(),
      front,
      back,
      flipped: false,
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setFront("");
    setBack("");

    window.location.reload()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-2xl mx-auto  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Створення карток</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Front"
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Back"
              className="text-black w-full  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddCard}
              className="   cursor-pointer w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Додати картку
            </button>
          </div>
        </div>
        <CardList cards={cards} setCards={setCards} />
      </div>
    </div>
  );
};

export default Home;