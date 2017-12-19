import React from 'react';
import './Alphabet.css';

class Alphabet extends React.Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      expanded: false
    }
  }  
  changeLetters = () => {
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
      }, 10);
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
    lettersRight.push(' ' + String.fromCharCode(90));
    return lettersLeft.concat(lettersRight);
  };

  // showAlphabet = () => {

  //   if (this.state.letters.includes('-')) this.setState({ letters: '# A Z' });
  //   if (this.state.letters.length < 52){
  //     return setTimeout(() => {
  //       this.setState({
  //         letters: [
  //           this.state.letters.slice(0, 3),
  //           String.fromCharCode(this.state.i),
  //           this.state.letters.slice(this.state.position)
  //         ].join(' '),
  //         i: this.state.i - 1,
  //         position: this.state.position - 2
  //       });
  //       if (this.state.i > 65) requestAnimationFrame(this.showAlphabet);
  //       }, 1000 / this.state.fps);
  //   }
  //   else if (this.state.letters.length > 5) {
  //     return setTimeout(() => {
  //       this.setState({
  //         letters: [
  //           this.state.letters.slice(0, this.state.position),
  //           this.state.letters.slice(this.state.position+1)
  //         ].join(' '),
  //         position: this.state.position + 2
  //       });

  //       if (this.state.position < -1) requestAnimationFrame(this.showAlphabet);
  //       else {
  //         console.log('Coucou');
  //         this.setState({
  //           letters: '#A-Z',
  //           i: 89
  //         });
  //       }
  //     }, 1000 / this.state.fps); 
  //   }
  // }


  render(){
    return <li className="pagination" onClick={this.changeLetters}>#{this.renderLetters()}</li>;
  }
}

export default Alphabet;