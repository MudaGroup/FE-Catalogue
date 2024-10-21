import React, { useEffect, useState } from 'react';
import "./Admin.css";

const AdminSlide = () => {
    const [slides, setSlides] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({ name: '', id: null });

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        const response = await fetch('http://localhost:5000/slides');
        const data = await response.json();
        setSlides(data);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('title', formData.name);

        await fetch('http://localhost:5000/slides', {
            method: 'POST',
            body: data,
        });

        setSelectedFile(null);
        setFormData({ name: '', id: null });
        fetchSlides();
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/slides/${id}`, {
            method: 'DELETE',
        });
        fetchSlides();
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('title', formData.name);

        await fetch(`http://localhost:5000/slides/${formData.id}`, {
            method: 'PATCH',
            body: data,
        });

        setSelectedFile(null);
        setFormData({ name: '', id: null });
        fetchSlides();
    };

    return (
        <>
        <div className='Admin-slide-page'>
            <form onSubmit={formData.id ? handleUpdate : handleSubmit} className='Admin-slide-form'>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter slide title"
                    required
                />
                <input type="file" onChange={handleFileChange} required className='Admin-slide-input' />
                <p>*Ukuran Foto 1480*410 Pixel</p>
                <button type="submit" className='Admin-slide-btn'>{formData.id ? 'Update Slide' : 'Add Slide'}</button>
            </form>

            <div className="slide-container">
                {slides.map((slide) => (
                    <div key={slide.id} className="slide">
                        <img src={`http://localhost:5000/slide/${slide.image}`} alt={slide.name} className='Admin-slide-img' />
                        <h3 className='Admin-slide-title'>{slide.name}</h3>
                        <button onClick={() => handleDelete(slide.id)} className='Admin-slide-btn-delete'>Delete</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default AdminSlide;
