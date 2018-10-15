import React, { Component } from 'react';
import PropTypes from 'prop-types';

import shortId from 'shortid';

class LabeledInput extends Component {
  constructor(props) {
    super(props);

    this.state = { id: props.id || shortId() };
  }

  render() {
    const { id } = this.state;
    const { children, ...props } = this.props;
  
    return (
      <div>
        <input id={id} {...props} />
        <label htmlFor={id}>{children}</label>
      </div>
    );
  }
}

LabeledInput.propTypes = {
  id: PropTypes.string
};

export default LabeledInput;