import { useEffect, useState } from 'react';
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const HomeComponent = () => {
    const [slides, setSlides] = useState([]);

    // Fungsi untuk mengambil data gambar dari backend
    const fetchSlides = async () => {
        try {
            const response = await fetch("http://localhost:5000/slides"); // Ganti dengan endpoint yang sesuai
            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    return (
        <div className="homepage">
            <header className="header-box">
                <Carousel>
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.id}>
                            <img
                                src={slide.url} // Ganti dengan URL gambar yang sesuai
                                alt={slide.name} // Gunakan nama slide sebagai alt text
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </header>
        </div>
    );
};
