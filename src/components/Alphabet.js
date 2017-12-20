import React from 'react';
import './Alphabet.css';
import Letters from '../presentational/Letters';

class Alphabet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      expanded: false
    }
  }  

  changeLetters = e => {
    const tick = () =>
      setTimeout(() => {
        this.setState({
          offset: this.state.expanded ?
            this.state.offset - 1
            :
            this.state.offset + 1
        });
        if (this.state.expanded ? this.state.offset > 0 : this.state.offset < 24) {
          tick();
        }
        else this.setState({ expanded: !this.state.expanded });
      }, 5);
    tick();
  };

  renderLetters = () => {
    const { offset } = this.state;
    const lettersLeft = [];
    const lettersRight = [];
    for (let i = 0; i <= offset; i++) {
      lettersLeft.push(String.fromCharCode(65 + i) + ' ');
      if (offset === 0) lettersLeft.push('-');
    }
    lettersRight.push(` ${String.fromCharCode(90)}`);
    return lettersLeft.concat(lettersRight);
  };

  getHerosStartingWith = (e) => {
    if (this.state.expanded) {
      return this.props.fetchByLetter(e);
    }
  }
  render() {
    return (
      <Letters
        changeLetters={this.changeLetters}
        renderLetters={this.renderLetters()}
        fetchByLetter={this.getHerosStartingWith}
      />
    )
  }
}

export default Alphabet;