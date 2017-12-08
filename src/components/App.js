import React from 'react';
import Header from '../container/Header';
import HomeContainer from '../container/ContainerHome';
import './App.css';

const App = ({ setFilter, filter }) => {
  return(
  <div>
    <div>
      <Header />  
      <HomeContainer />
    </div>
      <div id='background'></div>
  </div>  
  )
};

export default App;