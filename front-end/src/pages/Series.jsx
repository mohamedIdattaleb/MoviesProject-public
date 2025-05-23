import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../composent/NavBar";
import Footer from "../composent/Foter";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
// import "./ListPage.css";

const API_URL = "http://localhost:8000/api/v1/series";

function SeriesList() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Series List";
        axios.get(API_URL)
            .then(response => {
                setSeries(response.data || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur lors du chargement des séries.");
                setLoading(false);
            });
    }, []);

    const handleWatchClick = (id) => {
        navigate(`/watch/series/${id}`);
    };

    if (error) return <p className="error">{error}</p>;

    return (
        <>
            <NavBar />
            <div className="container">

                <h1 className="h">List Of Series</h1>
                <div className="movie-grid">
                    {series.map((serie, index) => (
                        <motion.div style={{ background: `url(${serie.image_path}) no-repeat center center`, backgroundSize: 'cover' }} key={index} className="movie-card" whileHover={{ scale: 1.05 }}>
                            {/* <img src={serie.image_path} alt={serie.title} /> */}
                            <div className="overlay" onClick={() => handleWatchClick(serie.id, "movies")} >
                                <FaPlay className="play-icon" />
                                <div className="title">{serie.title}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SeriesList;
