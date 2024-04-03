
import React, { useState } from 'react';

interface ProductProps {
  itemNames: string[]; // List of item names
  onDelete: (itemName: string) => void; // Function to handle item deletion
}

const DeleteItemForm: React.FC<ProductProps> = ({ itemNames, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      onDelete(selectedItem);
      setSelectedItem(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Delete Item</h2>
      </div>
      <div>
        <label htmlFor="itemName">Select Item:</label>
        <select
          id="itemName"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          required
        >
          <option value="">Select an item</option>
          {itemNames.map((itemName, index) => (
            <option key={index} value={itemName}>
              {itemName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteItemForm;