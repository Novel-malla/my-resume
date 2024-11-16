import React, { useState, useEffect } from "react";
import "./MemoryMatch.css";

const cardItems = [
    { id: 1, name: "🌟" },
    { id: 2, name: "🍎" },
    { id: 3, name: "🚀" },
    { id: 4, name: "🎵" },
    { id: 5, name: "🐶" },
    { id: 6, name: "🍕" },
    { id: 7, name: "⚽" },
    { id: 8, name: "🏖️" },
];

const MemoryMatch = ({ onBack }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const shuffledCards = [...cardItems, ...cardItems]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, uniqueId: index }));
        setCards(shuffledCards);
    }, []);

    const handleCardClick = (uniqueId) => {
        if (flippedCards.length < 2 && !flippedCards.includes(uniqueId)) {
            setFlippedCards((prev) => [...prev, uniqueId]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [first, second] = flippedCards;
            const firstCard = cards.find((card) => card.uniqueId === first);
            const secondCard = cards.find((card) => card.uniqueId === second);

            if (firstCard.name === secondCard.name) {
                setMatchedCards((prev) => [...prev, first, second]);
            }

            setTimeout(() => setFlippedCards([]), 1000);
            setAttempts((prev) => prev + 1);
        }
    }, [flippedCards, cards]);

    const renderCard = (card) => {
        const isFlipped = flippedCards.includes(card.uniqueId);
        const isMatched = matchedCards.includes(card.uniqueId);

        return (
            <div
                key={card.uniqueId}
                className={`card ${isFlipped || isMatched ? "flipped" : ""}`}
                onClick={() => handleCardClick(card.uniqueId)}
            >
                <div className="card-front">{card.name}</div>
                <div className="card-back">?</div>
            </div>
        );
    };

    return (
        <div className="memory-match">
            <button className="back-button" onClick={onBack}>
                Back to Games
            </button>
            <h2>Memory Match</h2>
            <p>Attempts: {attempts}</p>
            <div className="card-grid">{cards.map(renderCard)}</div>
        </div>
    );
};

export default MemoryMatch;
