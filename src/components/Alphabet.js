import React from 'react';
import './Alphabet.css';

export default class Alphabet extends React.Component {
  constructor() {
    super()
    this.state = { fullAlphabet: false };
    this.fetchHerosStartingWith = this.fetchHerosStartingWith.bind(this);
  }
  fetchHerosStartingWith() {
    console.log(window.getSelection().focusNode.data[window.getSelection().focusOffset]);
  }

  render() {
    if (this.state.fullAlphabet){
      return <li className="pagination" onClick={this.fetchHerosStartingWith} >A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</li>;
    }
    return <li className="pagination" onClick={() => this.setState({ fullAlphabet: true })} >#A-Z</li>;
  }
  
}