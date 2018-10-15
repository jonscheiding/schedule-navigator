import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterHeader = styled.h3`
  text-transform: uppercase;
  margin-bottom: 5px;

  > .buttons {
    margin-top: 3px;
    font-weight: normal;
    font-size: 1rem;
    float: right;
  }
`;

const Buttons = ({children}) => (
  <div className='buttons'>{children}</div>
);

Buttons.propTypes = {
  children: PropTypes.any
};

export default FilterHeader;
export { Buttons };
