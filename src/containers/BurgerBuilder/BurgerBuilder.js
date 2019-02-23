import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from './../../axios-orders';
import Aux from '../../hoc/Auxl/Auxl'
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components//UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from './../../store/actions';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://react-my-burger-9fe14.firebaseio.com/ingredients.json')
    //       .then(response => {
    //         this.setState({ingredients: response.data});
    //       })
    //       .catch(error => {
    //         this.setState({ error: true });
    //       });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  updatePurchaseState = (ingredients) => {
    // const ingredients = {
    //   ...this.state.ingredients
    // };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }

  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldprice = this.state.totalPrice;
  //   const newPrice = oldprice + priceAddition;

  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });

  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }

  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }

  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldprice = this.state.totalPrice;
  //   const newPrice = oldprice - priceAddition;

  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })

  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchageCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchageContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disableInfo = {
      ...this.props.ings
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />;

    if (this.props.ings) {
      burger = (<Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disableInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
          price={this.props.price}
        />
      </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchageCancelHandler}
        purchaseContinued={this.purchageContinueHandler}
        price={this.props.price}
      />

    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchageCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName })
    },
    onIngredientRemoved: (ingName) => {
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))