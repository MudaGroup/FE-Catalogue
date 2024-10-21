import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

      // Fungsi untuk menutup menu setelah item diklik
    const handleMenuClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="">
            <Link to="/" className="tittle">
                <img src="/public/img/Logo/LOGO JGM.png" alt="Img-Logo" />
            </Link>
            <div
                className="menu"
                onClick={() => {
                    setMenuOpen(!menuOpen);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to="/" onClick={handleMenuClick}>Home</Link>
                </li>
                <li>
                    <Link to="/ProductPage" onClick={handleMenuClick}>Product</Link>
                </li>
                <li>
                    <Link to="/Profile" onClick={handleMenuClick}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
};