import React, { useState } from 'react';


import { apiProduct } from '../pages/MyOrders';

export interface IProductData  {
    name: string,
    price: number,
    isPricePerKilo: boolean,
    imageURL: string,
    productID: number
  }
  
  interface Props {
    onSubmit: (product: apiProduct) => void;
  }
  
  const ProductForm: React.FC<Props> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isPricePerKilo, setIsPricePerKilo] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const product: apiProduct = {
        name,
        price: parseFloat(price),
        isPricePerKilo,
        imageURL,
        productID: 0
      };
      onSubmit(product);
      setSuccessMessage('Product added successfully');
      // Reset form fields after successful submission
      setName('');
      setPrice('');
      setIsPricePerKilo(false);
      setImageURL('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {successMessage && <p>{successMessage}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="isPricePerKilo">Price per Kilo:</label>
          <input
            type="checkbox"
            id="isPricePerKilo"
            checked={isPricePerKilo}
            onChange={(e) => setIsPricePerKilo(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default ProductForm;