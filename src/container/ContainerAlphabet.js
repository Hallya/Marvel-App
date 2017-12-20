import { fetchByLetter } from '../actions/actions';
import { connect } from 'react-redux';
import Alphabet from '../components/Alphabet';

const mapDispatchToProps = dispatch => {
  return {
    fetchByLetter: e => {
      let letter = e.target.textContent.replace(' ', '');
      dispatch(fetchByLetter(letter));
    }
  }
}

export default connect(null, mapDispatchToProps)(Alphabet);