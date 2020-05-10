import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product] = useState({
    name: "React from Facebok",
    price: 10,
    productBy: "facebook"

  })

  const makePayment = token => {
    console.log('key ', process.env.REACT_APP_KEY)
    const body = { token, product };
    const headers = { "Content-Type": "application/json" }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="waves-effect waves-light btn blue">Buy React in ${product.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
