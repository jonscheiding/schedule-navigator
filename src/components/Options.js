import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FILTER_PROPERTIES } from '../state/reducers';
import FilterHeader from './FilterHeader';
import LabeledInput from './LabeledInput';

class Options extends Component {
  render() {
    const { colorBy } = this.props.options;

    return (
      <div>
        <FilterHeader>Options</FilterHeader>
        <div>
          Color by:
          {FILTER_PROPERTIES.map(option => (
            <LabeledInput type='radio' radioGroup='colorBy' 
              key={option} value={option} 
              checked={option === colorBy} onChange={this.handleColorByChange}>
              {option}
            </LabeledInput>
          ))}
        </div>
      </div>
    );
  }

  handleColorByChange = (e) => {
    this.props.onChangeOptions({ colorBy: e.target.value });
  }
}

Options.propTypes = {
  options: PropTypes.shape({
    colorBy: PropTypes.string.isRequired
  }).isRequired,
  onChangeOptions: PropTypes.func.isRequired
};

export default Options;
