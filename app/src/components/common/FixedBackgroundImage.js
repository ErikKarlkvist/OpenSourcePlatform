import React from "react";

const FixedBackgroundImage = props => {
  const styles = {
    container: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      zIndex: -1,
      top: 0,
      left: 0
    },
    test: {
      //blur etc
      objectFit: "cover",
      width: "100%",
      height: "100%",
      filter: "blur(7px)",
      opacity: 0.4
    }
  };

  return (
    <div style={styles.container}>
      {props.headerImageURL && (
        <img style={styles.test} src={props.headerImageURL} alt="Background" />
      )}
    </div>
  );
};

export default FixedBackgroundImage;
