import React, { useState } from "react";

export const Buttons = ({ menuItems, filterItems, setItems }) => {
    const [activeItem, setActiveItem] = useState('All'); // Set default active item to 'All'

    const handleClick = (val) => {
        setActiveItem(val); // Set item yang diklik sebagai aktif
        filterItems(val); // Filter item berdasarkan nilai yang diklik
    };

    return (
        <div className="buttons-product">
            {/* <button
                className={`button-product-2 ${activeItem === "All" ? "active" : ""}`}
                onClick={() => {
                    setActiveItem("All");
                    filterItems("All"); // Menampilkan semua item
                }}
            >
                All
            </button> */}
            {menuItems.map((val, index) => (
                <button
                    key={index}
                    className={`button-product-2 ${activeItem === val ? "active" : ""}`}
                    onClick={() => handleClick(val)}
                >
                    {val}
                </button>
            ))}
        </div>
    );
};
