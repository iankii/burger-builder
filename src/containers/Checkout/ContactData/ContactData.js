import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from './../../../axios-orders';

import Button from './../../../components//UI/Button/Button';
import classes from './ContactData.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: ''
      },
      Country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest'},
            { value: 'normal', displayValue: 'Normal'}
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    // alert('you continue!');
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
    }

    console.log(order);
    axios.post('/orders.json', order)
          .then(response => {
            console.log(response);
            this.setState({ loading: false});
            this.props.history.push('/');
          })
          .catch(error => {
            console.log(error);
            this.setState({ loading: false });
          });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
  }

  render() {
    const formElementsArray = [];

    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={ formElement.config.elementType }
            elementConfig={ formElement.config.elementConfig }
            value={ formElement.config.value }
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return(
      <div className= {classes.ContactData}>
        <h4>
          Enter your contact data:
        </h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);