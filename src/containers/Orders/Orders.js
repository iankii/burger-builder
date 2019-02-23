import React, { Component } from 'react';

import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  
  componentDidMount() {
    axios.get('./orders.json')
          .then(res => {
            console.log('res from order.json', res.data)
            const fetchOrders = [];

            for(let key in res.data) {
              fetchOrders.push({
                ...res.data[key],
                id: key
              });
            }

            this.setState({loading: false, orders: fetchOrders})
            // this.setState((state, props) => {
            //   return {loading: false, orders: fetchOrders};
            // });
          })
          .catch(err => {
            this.setState({loading: false})
          })
  }

  render() {
    console.log(this.state)
    let orders = this.state.orders.map(order => <Order 
                                                  key={order.id}
                                                  ingredients={order.ingredients}
                                                  price={order.price}
                                                />
                                      );
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
// export default Orders;