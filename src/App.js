import React, { Component } from 'react';
import './App.css';
import Circles from './Circles/Circles';
import GameOver from './GameOver/GameOver';

// Huom! Tämä funktio on kirjoitettu classin ulkopuolelle
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rivit 23-26: Huom! Komponentin sisälle ei voi kirjoittaa esim. onClickiä! Se ei toimi. Sen sijaan html:n, esimerkiksi buttonin, sisälle voi kirjoittaa näin
// Rivit 23-26: React käy yleensä automaattisesti kaikki funktiot läpi heti käynnistyessään. Jottä näin ei kävisi, pitää clickHandlerin eteen lisätä arrow function!
class App extends Component {
  state = {
    score: 0,
    current: 0,
    rounds: 0,
    showGameOver: false,
  }
  
  pace = 1500;
  timer = undefined;

next = () => {
  let nextActive = undefined;
  do {
    nextActive = getRandomInteger(1, 4);
  } while (nextActive === this.state.current);
  
  this.setState({
    current: nextActive,
    rounds: this.state.rounds + 1
  })

  console.log(this.state.rounds);

  this.pace *= 0.95;
  this.timer = setTimeout(this.next.bind(this), this.pace);

  console.log(this.state.current);
}

clickHandler = (circleId) => {
  console.log("Wow!", circleId);

  if (this.state.current !== circleId) {
    this.endHandler();
    return;
  }
  this.setState({
      score: this.state.score + 1,
      rounds: 0
  })

}
// Nextin voi myös kirjoittaa suoraan tähän funktioon. Tämä kirjoitustyyli on toisaalta havainnollinen koodin luettavuuden kannalta
startHandler = () => {
  this.next();
}

endHandler = () => {
  clearTimeout(this.timer);
  this.setState({
    showGameOver: true
  })
}
// Esim. rivi 62: attribuuttien edessä ei ole välilyöntiä!
  render () {
    return (
      <div className="App">
        <h1>Speedgame</h1>
        <p>Score: {this.state.score}</p>
        <Circles 
          buttonColor='blue'
          active={this.state.current === 1}
          click={() => this.clickHandler(1)}/>
        <Circles 
          buttonColor='magenta'
          active={this.state.current === 2}
          click={() => this.clickHandler(2)}/>
        <Circles 
          buttonColor='yellow'
          active={this.state.current === 3}
          click={() => this.clickHandler(3)}/>
        <Circles 
          buttonColor='orangered'
          active={this.state.current === 4}
          click={() => this.clickHandler(4)}/>
        <div>
          <button onClick={this.startHandler}>Start Game</button>
          <button onClick={this.endHandler}>End Game</button>
        </div>

        { this.state.showGameOver && <GameOver score={this.state.score} />}
      </div>
    );
  }
}

export default App;
