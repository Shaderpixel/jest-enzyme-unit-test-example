import React from 'react';
import PropTypes from 'prop-types';

// Method 3: Also stateless functional component but using destructuring
const Header = ({ tagline }) => (
  /*
    // destructuring props into a variable called tagline which is similar to the attribute name on the component
		// using implicit return for arrow function since there is only one "block" of code here
		*/
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{tagline /*instead of doing this.props.tagline*/}</span>
    </h3>
  </header>
);

// Method 2: stateless functional components
// const Header = props => ( // using implicit return
// 		<header className="top">
// 			<h1>
// 				Catch
// 				<span className="ofThe">
//           <span className="of">of</span>
//           <span className="the">the</span>
//         </span>
// 				Day
// 			</h1>
// 			<h3 className="tagline">
// 				<span>{props.tagline}</span>
// 			</h3>
// 		</header>
// );

// Method 1: obtaining data through props
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">the</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     );
//   }
// }

// since this is a stateless functional component, we need to do it after the component itself
Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};

export default Header;
