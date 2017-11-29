import { connect } from 'react-redux';
import Hero from '../presentational/Hero';

const mapStateToProps = (state) => {
  return { heros: state.posts.actualPage };
}

export default connect(mapStateToProps)(Hero);