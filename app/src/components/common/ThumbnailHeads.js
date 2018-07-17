import React from "react";

//this is for the owners head on thumbnails
const ThumbnailHeads = props => {
  const data = props.owners;
  let items = [];
  if (data) {
    items = data.slice(0, 4).map(d => (
      <div>
        <img style={styles.image} src={d.profileImageURL} alt={d.firstName} />
      </div>
    ));
  }

  return (
    <div style={styles.container} class="row align-bottom">
      {items}
      {data.length > 3 && (
        <span style={styles.ellipses} class="align-bottom">
          and {data.length - 3} more
        </span>
      )}
    </div>
  );
};

const styles = {
  image: {
    backgroundColor: "white",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    border: "1px white ",
    marginRight: "5px",
    objectFit: "cover"
  },
  ellipses: {
    fontSize: 12,
    marginTop: "20px",
    color: "var(--dark-teal)"
  },
  container: {
    marginLeft: 5
  }
};

export default ThumbnailHeads;
