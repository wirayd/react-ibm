import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { useNavigate } from 'react-router-dom';
import { ProductList } from './ProductList'; // Assuming you have a ProductList component
import './CartItem.css';
import './Modal.css'; // Assuming you have a CSS file for styling

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
       // let total=''

          let [total, setTotal] = useState(0);
          // // console.log(cart);
          cart.forEach(item => {
            const quantity = item.quantity;
            const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
            total += quantity * cost;
          });
        
          return total;
          // console.log(total);

          // return total.toFixed(2);

  };

  const handleContinueShopping = (e) => {
    console.log(e);

    const navigate = useNavigate();
    return(
      navigate('/ProductList')
    )



    
  };



  const handleIncrement = (item) => {
    console.log(item);
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    // Update the cart state with the new quantity
    // This will trigger a re-render and update the total cost accordingly
  };

  const handleDecrement = (item) => {
    console.log(item);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, remove the item from the cart
      dispatch(removeItem(item.name));

    }
    // Update the cart state with the new quantity or remove the item
    // This will trigger a re-render and update the total cost accordingly
   
  };

  const handleRemove = (item) => {
    console.log(item);
    dispatch(removeItem(item.name));
    // Remove the item from the cart
    // This will trigger a re-render and update the total cost accordingly
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const quantity = item.quantity;
    const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
    return (quantity * cost).toFixed(2); // return total cost for the item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => setShowModal(true)}>Checkout</button>
      </div>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Information</h2>
            <p>Coming Soon</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;


