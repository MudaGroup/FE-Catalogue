import React, { useEffect, useState } from 'react';

const Card = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    })
    return (
        <div className="product-list">
            <div className="card-container">
                {products.map(item  => (
                    <div key={item.id} className="card">
                        <div className="card-img">
                            <img src={item.url} alt={item.title} />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{item.name}</h4>
                            <div className="card-category">{item.category}</div>
                            <div className="card-price">Rp{(item.price / 100).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    );
};

export default Card;
