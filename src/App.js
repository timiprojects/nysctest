import React, { Component } from 'react'
import './App.css';
import { Container } from 'semantic-ui-react'


class App extends Component {
  render() {
    return (
      <Container text className="App">
        <div>
          {this.props.children}
        </div>
      </Container>
    )
  }
}

export default App