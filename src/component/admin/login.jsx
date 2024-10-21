import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Admin.css";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inisialisasi useNavigate

    useEffect(() => {
        // Ambil email dari localStorage jika ada
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });
            // Simpan access token
            localStorage.setItem('accessToken', response.data.accessToken);
            // Simpan email ke localStorage
            localStorage.setItem('savedEmail', email);
            // Arahkan ke halaman dashboard atau halaman lain setelah login
            window.location.href = '/Admin';
        } catch (err) {
            // Tampilkan error jika login gagal
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    const handleBack = () => {
        navigate('/'); // Arahkan ke halaman Home
    };

    return (
        <>
            <div className='btn-back-login' onClick={handleBack}>
                <IoMdArrowRoundBack />
            </div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin} className='form-login'>
                    <div className='form-login-email'>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-login-password'>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='btn-login'>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
