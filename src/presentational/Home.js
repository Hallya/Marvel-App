import React from 'react';

const Home = (props) => (
  <nav>
    <ul>
      <li onClick={props.clickCharacters}>Characters</li>
      <li onClick={props.clickComics}>Comics</li>
    </ul>
    <div></div>
  </nav>
);
export default Home;