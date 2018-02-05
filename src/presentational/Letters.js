import React from 'react';
import './Letters.css';

const Letters = props => (
  <li className="pagination" onClick={props.changeLetters}>
    <span>#</span>
    {props.renderLetters.map(e => <span key={e} onClick={props.fetchByLetter} className={props.checkLetters(e)}>{e}</span>)}
  </li>
)

export default Letters;