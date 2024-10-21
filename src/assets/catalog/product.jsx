import { FaWhatsapp } from "react-icons/fa";

export const Product = (props) => {
    const whatsappLink = `https://wa.me/${props.phone}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(props.title)}`;

    return (
        <div className="catalog-item">
            <h2 className="catalog-title">{props.title}</h2>
            <img src={props.img} alt="img-catalog" />
            <p className="catalog-desc">{props.desc}</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="catalog-button">
                <FaWhatsapp /> Beli Sekarang
            </a>
        </div>
    );
}
