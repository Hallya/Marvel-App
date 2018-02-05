import React from 'react';
import './Alphabet.css';
import Letters from '../presentational/Letters';

class Alphabet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      expanded: false,
      selectedLetters: []
    }
  }

  colorSelectedLetters = e => {
    const letter = e;
    if (this.state.selectedLetters.find(e => e === letter)) return ("Selected");
    else return ("notSelected");
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
      this.setState({ selectedLetters: [...this.state.selectedLetters, e.target.textContent] });
      return this.props.fetchByLetter(e);
    }
  }
  render() {
    return (
      <Letters
        changeLetters={this.changeLetters}
        renderLetters={this.renderLetters()}
        fetchByLetter={this.getHerosStartingWith}
        checkLetters={this.colorSelectedLetters}
      />
    )
  }
}

export default Alphabet;