import { connect } from 'react-redux';

import { CHANGE_OPTIONS } from '../state/actions';
import { getOptions } from '../state/selectors';
import Options from '../components/Options';

const mapStateToProps = (state) => ({
  options: getOptions(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeOptions: (options) => dispatch({type: CHANGE_OPTIONS, options})
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
