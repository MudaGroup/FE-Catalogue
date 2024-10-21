import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const CatalogComponent = () => {
    const phoneNumber = "6285157578649"; // Nomor telepon tujuan dengan kode negara
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    const [catalog, setCatalog] = useState([]); // State untuk menyimpan data katalog

    // Fungsi untuk mengambil data katalog dari backend
    const fetchCatalog = async () => {
        try {
            const response = await fetch("http://localhost:5000/catalog"); // Ganti dengan endpoint yang sesuai
            const data = await response.json();
            setCatalog(data); // Simpan data katalog di state
        } catch (error) {
            console.error("Error fetching catalog:", error);
        }
    };

    useEffect(() => {
        fetchCatalog(); // Panggil fungsi untuk fetch data saat komponen di-mount
    }, []);

    return (
        <>
            <div className="catalog-page">
                <header className="catalog-header">Catalog</header>
                <div className="catalog-list">
                    {catalog.length > 0 ? (
                        catalog.map((product) => (
                            <div key={product.id} className="catalog-item">
                                <h2 className="catalog-title">{product.name}</h2> {/* Nama produk */}
                                <img src={product.url} alt={product.title} width="100" /> {/* Gambar produk */}
                                <p className="catalog-desc">{product.desc}</p> {/* Deskripsi produk */}
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp /> Whatsapp
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </>
    );
};
