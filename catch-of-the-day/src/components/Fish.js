import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  /*since this is a normal React Component and not a stateless functional component we can add the propTypes as a
   static property so that everytime a fish component is created, we do not have to duplicate the propTypes property*/
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };

  render() {
    const { image, name, price, desc, status } = this.props.details; // es6 destructuring
    const isAvailable = status === 'available'; // return true if available
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
          // onClick={this.props.addToOrder.bind(null, this.props.index)} //or use bind
        >
          {isAvailable ? 'Add to Order' : 'Sold Out'}
        </button>
      </li>
    );
  }
}

export default Fish;
