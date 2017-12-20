import React from 'react';

const Letters = props => (
  <li className="pagination" onClick={props.changeLetters}>
    <span>#</span>
    {props.renderLetters.map(e => <span key={e} onClick={props.fetchByLetter}>{e}</span>)}
  </li>
)

export default Letters;