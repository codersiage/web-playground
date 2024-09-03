import { useState } from "react";


export default function Board() {
  // 下一步是 X 还是 O 的标识
  const [xIsNext, setXIsNext] = useState(true);
  // 为每个方格创建一个状态，并初始化为 null
  const [squares, setSquares] = useState(Array(9).fill(null));

  // 检查游戏状态，输出轮次信息和获胜信息，每次组件状态更新的时候都会执行
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // 定义处理方块点击的事件处理函数
  function handleClick(i) {
    // 当前方格已经落子了，就不允许改变状态了，或者已经诞生赢家了游戏结束
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // 创建一个 squares 的副本，用于更新状态
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 注意这里要用箭头函数传参，可以思考下为什么要这么做？ */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/> 
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/> 
      </div>
      <div className="board-row">    
        {/* 使用箭头函数可以很方便地定义匿名函数 */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/> 
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/> 
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/> 
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/> 
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/> 
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/> 
      </div>
    </>
  );
}

// 组件接受两个参数，状态和用于更新父组件状态的点击事件
function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square"
      onClick={ onSquareClick }
    >
      {value}
    </button>
  );
}
  
// 辅助函数，检查获胜者
function calculateWinner(squares) {
  // 定义所有能连成一条线的下标组合
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
    // 检查每条线的三个方格的状态是否都是 X 还是 O
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 返回获胜的是 X 还是 O
      return squares[a];
    }
  }
  return null;
}