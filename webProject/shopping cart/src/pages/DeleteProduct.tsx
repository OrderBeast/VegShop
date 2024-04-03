
import { useState, useEffect } from 'react';
import DeleteItemForm from '../components/DeleteItemForm';

export function DeleteProduct() {
  const [itemNames, setItemNames] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/getAllProductsNames/")
      .then(response => response.json())
      .then(data => {
        setItemNames(data);
      });
  }, []); // Fetch item names once when the component mounts
    
  function callDeleteProduct(itemName: string) {
    const data: { productName: string } = {
        productName: itemName
    };
    fetch("http://127.0.0.1:8000/deleteProduct/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(ob => {
      console.log(ob);
      // If deletion is successful, update the list of item names
      setItemNames(prevItemNames => prevItemNames.filter(name => name !== itemName));
    });
  }

  console.log(itemNames);
  return (
    <DeleteItemForm itemNames={itemNames} onDelete={callDeleteProduct} />
  );
}

export default DeleteProduct;
