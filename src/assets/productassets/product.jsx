import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWhatsapp } from 'react-icons/fa';

const formatPrice = (price) => {
    // Mengubah harga menjadi string dan memformatnya
    return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const Product = ({ name, img, price }) => {
    const phoneNumber = "6285157578649"; // Nomor telepon tujuan dengan kode negara
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        `Saya tertarik dengan produk: ${name}, Harga: ${formatPrice(price)}. Apakah barang ini masih tersedia?`
    )}`;

    return (
        <div className="productassets-card">
            <div className="productassets-img">
                <img src={img} alt={name} />
            </div>
            <div className="productassets-body">
                <h2 className="productassets-title">{name}</h2>
                <p className="productassets-price">{formatPrice(price)}</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp /> Whatsapp
                </a>
            </div>
        </div>
    );
};
