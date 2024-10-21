import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminProduct from './AdminProduct';
import AdminSlide from './AdminSlide';
import AdminCatalog from './AdminCatalog';
import "./Admin.css";

const Admin = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate
    const [userName, setUserName] = useState(''); // State untuk menyimpan username
    const [loading, setLoading] = useState(true); // State untuk loading

    useEffect(() => {
        // Ambil data pengguna dari API
        const fetchUserName = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/${userId}');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Misalnya, ambil username dari data pertama
                // Sesuaikan dengan struktur data yang dikembalikan oleh API Anda
                if (data.length > 0) {
                    setUserName(data[0].name); // Ganti 'name' sesuai dengan properti dari data pengguna
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            } finally {
                setLoading(false); // Set loading menjadi false setelah fetch selesai
            }
        };

        fetchUserName();
    }, []);

    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem('accessToken');
        // Arahkan kembali ke halaman login
        navigate('/login');
    };

    return (
        <>
            <div>
                <div className='admin-component'>
                    <button className='btn-logout' onClick={handleLogout}>Logout</button>
                </div>
                <h2 className='Admin-page'>Manage Admin</h2>
                <div><AdminSlide /></div>
                <div><AdminCatalog /></div>
                <div><AdminProduct /></div>
            </div>
        </>
    );
}

export default Admin;
