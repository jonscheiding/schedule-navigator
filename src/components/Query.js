import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
 
import FilterHeader from './FilterHeader';

class Query extends Component {
  render() {
    const { query } = this.props;

    return (
      <div>
        <FilterHeader>Search</FilterHeader>
        <DebounceInput type='text' debounceTimeout={500}
          style={{ width: '100%', fontSize: '1.1rem', padding: '5px' }}
          value={query} onChange={this.handleChange} />
      </div>
    );
  }

  handleChange = (e) => {
    this.props.onChangeQuery(e.target.value);
  }
}

Query.propTypes = {
  query: PropTypes.string,
  onChangeQuery: PropTypes.func
};

Query.defaultProps = {
  onChangeQuery: () => {}
};

export default Query;
