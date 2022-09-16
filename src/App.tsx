import { useState } from 'react';
import GameTitle from './components/GameTitle';
import Table from './components/Table';

function App() {

  const [color, setColor] = useState('blue');

  const handleClick = () => {
    if (color === 'blue') {
      setColor('red');
    }
    else if (color === 'red') {
      setColor('black');
    }
    else {
      setColor('blue');
    }
  };

  return (
    <div className="game-container">
      <button onClick={handleClick}>Change color</button>
      <GameTitle />
      <Table color={color} />
    </div>
  );
}

export default App;
