// eslint-disable-next-line no-unused-vars
import react from 'react';
import propTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Button = ({ type, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-purple-600 text-white p-2"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: propTypes.string.isRequired,
  button_title: propTypes.string,
  onClick: propTypes.func,
};

export default Button;
