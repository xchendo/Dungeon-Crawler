import React from 'react';
import Player from './Player';
import './App.css';

const WIDTH = 400;
const HEIGHT = 400;
const BOX_SIZE = 40;
const ARROW_KEY_CODES = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

class DungeonCrawler extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.context = null;
    this.state = {
      playerPosition: {
        x: 0,
        y: 0,
      },
    }
  }

  drawBoard() {
    let bw = WIDTH;
    let bh = HEIGHT;
    let interval = BOX_SIZE;

    const canvas = document.getElementById("dungeon-crawler");
    const context =  canvas.getContext("2d");
    context.strokeStyle='black';

    for (let x = 0; x <= bw / interval; x ++) {
      for (let y = 0; y <= bh / interval; y++) {
        let xPos = x * interval;
        let yPos = y * interval;
        context.strokeRect(xPos, yPos, interval, interval);;
      }
    }

    
    
    // for (let y = 0; y <= bh; y += interval) {
    //   context.moveTo(0, y);
    //   context.lineTo(bh, y);
    // }

    
  }

  componentDidMount() {
    const canvas = document.getElementById("dungeon-crawler");
    const context =  canvas.getContext("2d");
    this.drawBoard();
    this.draw(this.state.playerPosition, false);
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    
  }

  handleKeyDown(e) {
    let currentPosition = this.state.playerPosition;
    let newPlayerPosition = this.getNextPosition(e.keyCode);
    let isOutOfBounds = this.checkIfOutOfBounds(newPlayerPosition);
    if (isOutOfBounds) {
      return false;
    }
    this.setState({
      playerPosition: newPlayerPosition,
    });
    this.draw(currentPosition, true);
    this.draw(newPlayerPosition, false);
  }

  getNextPosition(keyCode) {
    let playerPosition = this.state.playerPosition;
    switch(keyCode) {
      case ARROW_KEY_CODES.UP:
        return {x: playerPosition.x, y: playerPosition.y - 1};

      case ARROW_KEY_CODES.DOWN:
        return {x: playerPosition.x, y: playerPosition.y + 1};

      case ARROW_KEY_CODES.LEFT:
        return {x: playerPosition.x - 1, y: playerPosition.y};
      
      case ARROW_KEY_CODES.RIGHT:
        return {x: playerPosition.x + 1, y: playerPosition.y};

      default:
        return {x: playerPosition.x, y: playerPosition.y};
    }
  }

  checkIfOutOfBounds(position) {
    if (position.x <= -1 || position.y <= -1) {
      return true;
    }
    return false;
  }

  draw(position, clear) {
    let color = clear ? 'white' : 'black';
    let size = BOX_SIZE;

    const canvas = document.getElementById("dungeon-crawler");
    let context =  canvas.getContext("2d");
    context.fillStyle=color;
    if (clear) {
      context.fillRect(position.x*40,position.y*40, size, size);
      context.strokeStyle='black';
      context.strokeRect(position.x*40,position.y*40, size, size);
    } else {
      context.fillRect(position.x * 40, position.y * 40, size, size);
    }
  }

  render() {
    return (
      <div className="App">
       <canvas tabIndex="1" ref="canvas" width={WIDTH} height={HEIGHT} id="dungeon-crawler"></canvas>
       <Player/>
      </div>
    );
  }
}

export default DungeonCrawler;
