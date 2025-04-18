// src/App.tsx
import Feauters from './components/Feauters';
import Herosection from './components/Herosection';
import Stats from './components/Stats';
import Team from './components/Team';
import TurnProfit from './components/TurnProfit';
import './style.css'; 

const App = () => {
  return (
    <>
      <Herosection/>
      <Feauters/>
      <TurnProfit/>
      <Stats/>
      <Team/>
    </>
  );
};

export default App;
