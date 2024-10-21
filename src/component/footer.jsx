import React from 'react';
import { productData } from '../assets/footer/data';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const Footer = () => {
    const { whatsapp, phonenumber, email } = productData[0];
  return (
    <footer className="footer">
      <div className="footer-content">
        <a className='whatsapp' href={`https://wa.me/${whatsapp}`} target='_blank' rel='noopener noreferrer'><FaWhatsapp />{whatsapp}</a>
        <a className='phone' href={`tel:${phonenumber}`}><FaPhone />{phonenumber}</a>
        <a className='email' href={`mailto:${email}`}><MdOutlineEmail />{email}</a>
      </div>
    </footer>
  );
};

export default Footer;
