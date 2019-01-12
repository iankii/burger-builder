import React, { Component } from 'react';

import Aux from './../../../hoc/Auxl/Aux';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {
 
  componentWillUpdate() {
    console.log('[orderSummary] willupdate')
  }
 

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
     });

    return (
      <Aux>
        <h3>Your Order </h3>
        <p>A delicious Burger with following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total Price: $<strong>{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;