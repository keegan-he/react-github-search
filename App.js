import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    username: '',
    results: [],
  }

  onUsernameChange = (ev) => {
    let value = ev.target.value;
    console.log('username is', value)
    this.setState({
      username: value,
    });
  }

  onSubmit = () => {
    console.log('onSubmit function clicked', this.state.username);
    fetch(`https://api.github.com/users/${this.state.username}/repos`)
    .then(response => response.json())
    .then(data => {
      console.log("data received", data)
      this.setState({
        results: data,
      });
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2018/03/GitHub-brave-hed-796x418.jpg" />
          <h1 className="App-title">GitHub Profile Search</h1>
        </header>
        <div className="Form">

          <input
              placeholder="Enter your GitHub username"
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          <h2>URL: github.com/{this.state.username || '...'}/</h2>
          <button onClick={() => this.onSubmit()}>Submit</button>


          <p>{this.state.results.length === 0 ? 'No results.' : ''}</p>

          {
            this.state.results.map(item => (
              <div>
                <hr />
                <h2>{item.name}</h2>
                <p>{item.description}</p>

              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
