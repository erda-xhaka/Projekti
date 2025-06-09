// src/services/api.js
export const getBooks = () => {
    return fetch('http://localhost:5000/api/books')
      .then(response => response.json());
  };
  
  export const createOrder = (orderData) => {
    return fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    }).then(response => response.json());
  };