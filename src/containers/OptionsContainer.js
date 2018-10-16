import { connect } from 'react-redux';

import { changeOptions } from '../state/actions';
import { getOptions } from '../state/selectors';
import Options from '../components/Options';

const mapStateToProps = (state) => ({
  options: getOptions(state)
});

const mapDispatchToProps = (dispatch) => ({
  onChangeOptions: (options) => dispatch(changeOptions(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
