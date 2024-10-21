import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Product } from "../assets/productassets/product";
import { responsive } from "../assets/product/data"; // Pastikan path-nya benar

export const ProductComponent = () => {
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data produk dari API
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));

        const startAutoSlide = () => {
            if (carouselRef.current) {
                intervalRef.current = setInterval(() => {
                    carouselRef.current.next(); // Pindah ke slide berikutnya
                }, 6000); // Interval waktu dalam milidetik (6000ms = 6 detik)
            }
        };

        startAutoSlide();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // Bersihkan interval saat komponen unmount
            }
        };
    }, []);

    return (
        <div className="productcomponent-page">
            <h1 className="productcomponent-title">Produk Tersedia</h1>
            {products.length > 0 ? (
                <Carousel
                    ref={carouselRef}
                    responsive={responsive}
                    arrows={false} // Menghilangkan panah navigasi jika tidak diperlukan
                    infinite={true} // Mengulangi carousel
                >
                    {products.map(item => (
                        <Product 
                            key={item.id}
                            name={item.name} 
                            img={item.url} // Sesuaikan dengan path gambar
                            price={`${(item.price / 100).toLocaleString('id-ID')}`} // Jika harga disimpan dalam sen
                        />
                    ))}
                </Carousel>
            ) : (
                <p className="no-products-message">Produk belum tersedia</p> // Pesan jika produk kosong
            )}
            <div className="productcomponent-btn">
                <a href="/ProductPage">Product Lainnya</a>
            </div>
        </div>
    );
};
