import React, { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './experience.css';

const experiences = [
    {
        title: "Software Developer",
        company: "Tech Corp",
        duration: "Jan 2022 - Present",
        description: [
            "Developed and maintained cloud-based services using AWS.",
            "Collaborated with a cross-functional team to design scalable applications.",
            "Improved application performance, reducing load time by 30%.",
        ],
    },
    {
        title: "Frontend Developer",
        company: "Design Studio",
        duration: "Aug 2020 - Dec 2021",
        description: [
            "Built responsive user interfaces using React and CSS.",
            "Integrated REST APIs to ensure seamless user experience.",
            "Led a team of junior developers for UI/UX improvements.",
        ],
    }
];

const Experience = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("");

    const handleNext = () => {
        setAnimationClass("animate-right");
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
            setAnimationClass(""); // Reset animation class after transition
        }, 300); // Match animation duration
    };

    const handlePrev = () => {
        setAnimationClass("animate-left");
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
            );
            setAnimationClass(""); // Reset animation class after transition
        }, 300); // Match animation duration
    };

    useEffect(() => {
        // Initialize AOS animation
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <section id="experience" className="section" data-aos="fade-up">
            <h2>Experience</h2>
            <div className="experience-container">
                <button onClick={handlePrev} className="arrow left-arrow">
                    &lt;
                </button>
                <div className={`experience-card ${animationClass}`}>
                    <div className="experience-left">
                        <h3>{experiences[currentIndex].title}</h3>
                        <p>{experiences[currentIndex].company}</p>
                        <p>{experiences[currentIndex].duration}</p>
                    </div>
                    <div className="experience-right">
                        <ul>
                            {experiences[currentIndex].description.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button onClick={handleNext} className="arrow right-arrow">
                    &gt;
                </button>
            </div>
        </section>
    );
};

export default Experience;
