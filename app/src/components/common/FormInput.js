import React from "react";
import PropTypes from "prop-types";

const FormInput = props => {
  const styles = {
    input: {
      width: "100%",
      backgroundColor: "var(--white-three)",
      paddingLeft: 10,
      border: "1px solid var(--dark-teal)"
    },
    space: {
      marginTop: "20px",
      width: "100%"
    }
  };
  return (
    <div style={styles.space}>
      {props.text}
      <input
        style={styles.input}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        pattern={props.pattern}
        customValidity
        onBlur={props.onBlur}
        required={props.required}
      />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

FormInput.defaultProps = {
  type: "text",
  pattern: null,
  onBlur: () => {},
  required: true
};

export default FormInput;
