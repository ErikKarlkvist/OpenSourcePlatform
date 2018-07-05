import React from 'react';
import PropTypes from 'prop-types'
import { RingLoader } from 'react-spinners';

class Spinner extends React.Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className='sweet-loading'>
        <RingLoader
          color={'#123abc'}
          loading={this.props.loading}
        />
      </div>
    )
  }
}

const styles = {
  fillPage: {
    position: "absolute",
    top: 0,
    bottom: 0,
  }
}

export default Spinner;
