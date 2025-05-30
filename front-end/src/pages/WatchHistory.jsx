import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WatchHistory.css";
import NavBar from "../composent/NavBar";
import Footer from "../composent/Foter";
import { motion } from "framer-motion";
const WatchHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
        setHistory(storedHistory.reverse()); // Afficher du plus récent au plus ancien
    }, []);

    const clearHistory = () => {
        localStorage.removeItem("watchHistory");
        setHistory([]); // Mettre à jour l'affichage
    };

    return (
        <>
            <NavBar />
            <div className="history-container">
            <motion.h1
                    className="about-title"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Watch History
                </motion.h1>

                <button onClick={clearHistory} className="clear-btn">Clear History</button>

                {history.length === 0 ? (
                    <p>No history available.</p>
                ) : (
                    <div className="history-grid">
                        {history.map((item, index) => (
                            <div key={index} className="history-card">
                                <Link to={`/watch/${item.type}/${item.id}`}>
                                    <img src={item.image} alt={item.title} className="history-img" />
                                </Link>
                                <div className="history-info">
                                    <h3>{item.title}</h3>
                                    <p>Watched on {new Date(item.watchedAt).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default WatchHistory;
