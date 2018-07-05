import React from 'react';
import PropTypes from 'prop-types'

class Spinner extends React.Component {

  static propTypes = {
    developers: PropTypes.object.isRequired
  }

  render() {
    const data = this.props.developers;

    let items = [];
    if(data){
      while(data.length < 4){
        data.push("empty")
      }
      items = data.map(d => (
        <div class="col-md-4 col-sm-6 col-lg-3">
          <img style = {styles.image} src = {d.profileURL}/>
        </div>
      ));
    }

    return (
      <div style={styles.container}>
        <h3>Contributors</h3>
        <div style={styles.imageWrapper}>
          <div class="row">{items}</div>
        </div>
      </div>
    )

  }
}

const styles = {
  container: {
    alignText: "left",
  },
  Contributors: {
    marginTop: "30px"
  },
  image: {
    backgroundColor: "white",
    height: "100px",
    width: "100px"
  },
  imageWrapper: {
    width: "50%",
    margin: "auto"
  }
}

export default Spinner;
