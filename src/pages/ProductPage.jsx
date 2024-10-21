import React, { useEffect, useState } from "react";
import { Product } from "../assets/productassets/product";

export const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // State untuk kategori
    const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                const data = await response.json();
                console.log(data); // Log data untuk memverifikasi
                setProducts(data);

                // Mengambil kategori unik dari produk
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Fungsi untuk menangani klik kategori
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Filter produk berdasarkan kategori yang dipilih
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className="product-page">
            <h1>Semua Produk</h1>

            {/* Menampilkan kategori */}
            <div className="category-list">
                <button onClick={() => setSelectedCategory("")} className="category-button">Semua</button> {/* Tombol untuk menampilkan semua produk */}
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="product-list">
                {filteredProducts.map(item => (
                    <Product
                        key={item.id} // Pastikan id unik untuk setiap produk
                        img={item.url}
                        name={item.name}
                        price={`${(item.price / 100).toLocaleString('id-ID')}`} // Menggunakan toLocaleString untuk format angka
                    />
                ))}
            </div>

        </div>
    );
};
