import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterHeader from './FilterHeader';
import LabeledInput from './LabeledInput';

const COLOR_BY_OPTIONS = ['location', 'topic', 'type'];

class Options extends Component {
  render() {
    const { colorBy } = this.props.options;

    return (
      <div>
        <FilterHeader>Options</FilterHeader>
        <div>
          Color by:
          {COLOR_BY_OPTIONS.map(option => (
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
