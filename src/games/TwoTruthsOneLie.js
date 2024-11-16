import React, { useState } from 'react';
import './TwoTruthsOneLie.css';

// Example truths and lies
const truths = [
    "I am a National level Golf player.",
    "I have travelled 70% of India.",
    "I love hiking in the mountains.",
    "I have a blue belt in Judo Karate.",
    "I am fluent in 3 languages.",
    "I can play the piano.",
    "I have been a part of a music band in School.",
    "I won my first award when I was only 5 months old.",
    "I once met MS Dhoni in a golf course.",
    "I have won a scupture making competition."
];

const lies = [
    "I don't know how to dance.",
    "I can't swim.",
    "I hate chocolate.",
    "I have never seen Star Wars.",
    "I am afraid of dogs."
];

const TwoTruthsOneLie = ({ onBack }) => {
    // State for truth/lie combination and user guess
    const [statements, setStatements] = useState([]);
    const [result, setResult] = useState(null);

    // Function to shuffle array items
    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Generate a random game
    const generateGame = () => {
        const selectedTruths = [];
        const selectedLies = [];

        // Pick 2 truths and 1 lie
        while (selectedTruths.length < 2) {
            const randomTruth = truths[Math.floor(Math.random() * truths.length)];
            if (!selectedTruths.includes(randomTruth)) selectedTruths.push(randomTruth);
        }
        while (selectedLies.length < 1) {
            const randomLie = lies[Math.floor(Math.random() * lies.length)];
            if (!selectedLies.includes(randomLie)) selectedLies.push(randomLie);
        }

        // Shuffle the selected statements
        const gameStatements = shuffleArray([...selectedTruths, ...selectedLies]);
        setStatements(gameStatements);
        setResult(null);
    };

    // Check the user's guess
    const checkAnswer = (answer) => {
        const lie = lies.find(lie => statements.includes(lie));
        setResult(answer === lie ? "Correct!" : "Wrong! Try again.");
    };

    return (
        <div className="game-section">
            <h2>Two Truths, One Lie</h2>
            <p>Guess which one is the lie!</p>

            <div className="statements">
                {statements.length === 0 ? (
                    <p>Click "Start Game" to begin!</p>
                ) : (
                    statements.map((statement, index) => (
                        <button
                            key={index}
                            className="statement-button"
                            onClick={() => checkAnswer(statement)}
                        >
                            {statement}
                        </button>
                    ))
                )}
            </div>

            {result && (
                <div className="result">
                    <p>{result}</p>
                    <button onClick={generateGame}>Play Again</button>
                </div>
            )}

            <button onClick={generateGame} className="start-game">
                Start Game
            </button>

            {/* Back to Games button */}
            <button onClick={onBack} className="back-to-games">
                Back to Games
            </button>
        </div>
    );
};

export default TwoTruthsOneLie;