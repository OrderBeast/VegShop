
import { useState, useEffect } from 'react';
import DeleteItemForm from '../components/DeleteItemForm';

export function DeleteProduct() {
  const [itemNames, setItemNames] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");


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

      if(ob.isDeleted) {
        setItemNames(prevItemNames => prevItemNames.filter(name => name !== itemName));
      }
      setMessage(ob.message)
    }).catch(e=> setMessage("error"));
  }

  console.log(itemNames);
  return <>
      <DeleteItemForm itemNames={itemNames} onDelete={callDeleteProduct} />
    <h3>{message}</h3>
  </>
}

export default DeleteProduct;
