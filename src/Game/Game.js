import React, { useState } from 'react';
import Board from './Board';

const Game = (props) => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]),
    [stepNumber, setStepNumber] = useState(0),
    [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  const handleClick = (i) => {
    const curHistory = history.slice(0, stepNumber + 1);
    const current = curHistory[curHistory.length - 1];
    const squares = current.squares.slice();

    if(squares[i] || calculateWinner(squares)) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(curHistory.concat([{
        squares: squares,
      }]));
      setStepNumber(curHistory.length);
      setXIsNext(!xIsNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const renderMoves = () => {
    const curHistory = history;
    const current = curHistory[stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = curHistory.map((step, move) => {
      const desc = move ?
        `Перейти к ходу #${move}: ${2}, ${2}` :
        'К началу игры';
      return (
        <li key={move} >
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return moves;
  }

  const renderStatus = () => {
    const curHistory = history;
    const current = curHistory[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return status;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{renderStatus()}</div>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  );
}

export default Game;