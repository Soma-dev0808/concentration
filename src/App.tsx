import { useState } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setColor, selectCardColor } from './feature/cardColorSlice';
import HeaderButtons from './components/HeaderButtons';
import GameTitle from './components/GameTitle';
import Table from './components/Table';

function App() {

  const dispatch = useAppDispatch();
  const color = useAppSelector(selectCardColor);


  // const [color, setColor] = useState('blue');
  const [design, setDesgin] = useState('default');

  const handleChangeColor = () => {
    if (color === 'blue') {
      dispatch(setColor('red'));
    }
    else if (color === 'red') {
      dispatch(setColor('black'));
    }
    else {
      dispatch(setColor('blue'));
    }
  };

  const handleChangeDesign = () => {
    if (design === 'default') {
      setDesgin('animal');
    }
    else if (design === 'animal') {
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
