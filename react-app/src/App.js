import React from "react";

class App extends React.Component {
  
  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }
  
  render(){
    console.log("render");
    return <h1>Marvel Heros</h1>
  }
}

export default App;