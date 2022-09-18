import HeaderButtons from './components/HeaderButtons';
import GameTitle from './components/GameTitle';
import Table from './components/Table';

function App() {
  return (
    <div className="game-container">
      <HeaderButtons />
      <div className="game-table-contaner">
        <GameTitle />
        <Table />
      </div>
    </div>
  );
}

export default App;
