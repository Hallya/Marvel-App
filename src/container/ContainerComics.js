import { connect } from 'react-redux';
import Comics from '../presentational/Comics';

const mapStateToProps = (state) => {
  return { comics: state.posts.actualPage };
}

export default connect(mapStateToProps)(Comics);