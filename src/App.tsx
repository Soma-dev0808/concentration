import { useState } from 'react';

import HeaderButtons from './components/HeaderButtons';
import GameTitle from './components/GameTitle';
import Table from './components/Table';

function App() {

  const [color, setColor] = useState('blue');
  const [design, setDesgin] = useState('default');

  const handleChangeColor = () => {
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

  const handleChangeDesign = () => {
    if (design === 'default') {
      setDesgin('animal');
    }
    else if (color === 'animal') {
      setDesgin('face');
    }
    else {
      setDesgin('default');
    }
  };

  return (
    <div className="game-container">

      <HeaderButtons
        changeCardColor={handleChangeColor}
        changeDesign={handleChangeDesign}
      />
      <GameTitle />
      <Table color={color} />
    </div>
  );
}

export default App;
