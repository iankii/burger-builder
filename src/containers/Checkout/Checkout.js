import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.props.ings} 
          checkoutContinued={this.onCheckoutContinuedHandler}
          checkoutCancelled={this.onCheckoutCancelledHandler}
          />
          <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData}
          />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);