import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    //first reinstate our localStorage before componentDidUpdate wipes it away
    const localStorageRef = localStorage.getItem(params.storeID);
    // if (localStorageRef) {
    // this.setState({order: JSON.parse(localStorageRef)})
    // }
    localStorageRef && this.setState({ order: JSON.parse(localStorageRef) });

    // sync only the current store id, and forward slash
    // allows you to go deeper into the nested object
    // syncState requires an object of some options, one is context and the other is the state that we wish to mirror
    this.ref = base.syncState(`${params.storeID}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeID,
      JSON.stringify(this.state.order),
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Make a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state using a built-in setState API
    this.setState({ fishes });
  };

  // these are all properties
  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of the current fish state
    const fishes = { ...this.state.fishes };
    // 2. update the fish key, because of firebase
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };

    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1; // if order[key] doesn't exist it will be set to 1

    // 3. call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of the current order state
    const order = { ...this.state.order };

    // 2. Remove particular order from state by deleting it since order is not mirrored to firebase
    delete order[key];

    // 3. call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          storeID={this.props.match.params.storeID}
        />
      </div>
    );
  }
}

export default App;
