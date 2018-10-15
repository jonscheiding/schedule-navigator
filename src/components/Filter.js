import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LabeledInput from './LabeledInput';

class Filter extends Component {
  render() {
    const { filter, className, style } = this.props;

    return (
      <div className={className} style={style}>
        {filter.map(f => 
          <LabeledInput 
            key={f.value} type='checkbox' 
            checked={f.isSelected} onChange={this.handleFilterChange(f.value)}>
            {f.value || <i>Unknown</i>}
          </LabeledInput>
        )}
      </div>
    );
  }

  handleFilterChange = (value) => (e) => {
    this.props.onFilterChange(value, e.target.checked);
  }
}

Filter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  filter: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterChange: PropTypes.func
};

Filter.defaultProps = {
  filter: [],
  onFilterChange: () => {}
};

export default Filter;
