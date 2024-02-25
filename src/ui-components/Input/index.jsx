// eslint-disable-next-line no-unused-vars
import react from 'react';
import propTypes from 'prop-types';

 
const Input = ({ label, name, value, type, onChange }) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">{label}</label>
        <input
          className="bg-white-200 p-2 border-2 border-blue-200"
          name={name}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
    </>
  );
};

Input.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};

export default Input;
