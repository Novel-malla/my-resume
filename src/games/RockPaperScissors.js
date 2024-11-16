import React, { useState, useEffect } from "react";
import './RockPaperScissors.css';

function RockPaperScissors({ onBack }) {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationIndex, setAnimationIndex] = useState(0);

    const choices = [
        { name: "rock", icon: "🪨" },
        { name: "paper", icon: "📄" },
        { name: "scissors", icon: "✂️" },
    ];

    const determineWinner = (player, computer) => {
        if (player === computer) return "It's a tie!";
        if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {
            return "You win!";
        }
        return "Computer wins!";
    };

    const playGame = (choice) => {
        setPlayerChoice(choice);
        setIsAnimating(true);

        const animationDuration = 2000; // 2 seconds
        const animationInterval = 150; // Speed of cycling

        let intervalIndex = 0;
        const interval = setInterval(() => {
            setAnimationIndex((prev) => (prev + 1) % choices.length);
            intervalIndex++;
            if (intervalIndex >= animationDuration / animationInterval) {
                clearInterval(interval);
                const randomChoice =
                    choices[Math.floor(Math.random() * choices.length)].name;
                setComputerChoice(randomChoice);
                setResult(determineWinner(choice, randomChoice));
                setIsAnimating(false);
            }
        }, animationInterval);
    };

    return (
        <div className="game-container">
            <h3>Rock, Paper, Scissors</h3>
            <div className="game-card">
                {/* Player's Choice */}
                <div className="player-choice">
                    <h4>Your Choice</h4>
                    <div className="choices">
                        {choices.map((choice) => (
                            <button
                                key={choice.name}
                                className={`choice-button ${playerChoice === choice.name ? "selected" : ""
                                    }`}
                                onClick={() => playGame(choice.name)}
                            >
                                <span className="icon">{choice.icon}</span>
                                <span className="label">
                                    {choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* VS Symbol */}
                <div className="vs-symbol">
                    <h2>VS</h2>
                </div>

                {/* Computer's Choice */}
                <div className="computer-choice">
                    <h4>Computer's Choice</h4>
                    <div className="lottery">
                        {isAnimating ? (
                            <div className="animated-icon">
                                {choices[animationIndex].icon}
                            </div>
                        ) : (
                            computerChoice && (
                                <div className="choice-result">
                                    <span className="icon">
                                        {choices.find((c) => c.name === computerChoice)?.icon}
                                    </span>
                                    <span className="label">
                                        {computerChoice.charAt(0).toUpperCase() +
                                            computerChoice.slice(1)}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Result */}
            {result && (
                <div className="results">
                    <h4>{result}</h4>
                </div>
            )}

            <button onClick={onBack} className="back-button">
                Back to Games
            </button>
        </div>
    );
}

export default RockPaperScissors;
