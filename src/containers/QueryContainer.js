import { connect } from 'react-redux';

import Query from '../components/Query';
import { changeQuery } from '../state/actions';

const mapStateToProps = (state) => ({
  query: state.query
});

const mapDispatchToProps = (dispatch) => ({
  onChangeQuery: (query) => dispatch(changeQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Query);