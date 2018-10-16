import React, { Component } from 'react';
import styled from 'styled-components';

import EventCalendarContainer from './containers/EventCalendarContainer';
import FilterContainer from './containers/FilterContainer';
import QueryContainer from './containers/QueryContainer';

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: 300px auto;

  > div {
    padding: 10px;
  }
`;

const FilterGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  > .auto {
    flex: 0 1 100%;
    overflow: auto;
  }

  > div:not(:last-child) {
    margin-bottom: 15px;
  }
`;

class App extends Component {
  render() {
    return (
      <AppGrid>
        <FilterGrid>
          <FilterContainer filterKey='location' />
          <FilterContainer filterKey='topic' className='auto' />
          <FilterContainer filterKey='type' />
          <QueryContainer />
        </FilterGrid>
        <EventCalendarContainer />
      </AppGrid>
    );
  }
}

export default App;
