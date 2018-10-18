import { connect } from 'react-redux';

import Query from '../components/Query';
import { CHANGE_QUERY } from '../state/actions';

const mapStateToProps = (state) => ({
  query: state.query
});

const mapDispatchToProps = (dispatch) => ({
  onChangeQuery: (query) => dispatch({type: CHANGE_QUERY, query}) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Query);