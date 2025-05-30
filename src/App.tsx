import { Routes, Route } from 'react-router-dom';
import Herosection from './components/Herosection';
import Feauters from './components/Feauters';
import TurnProfit from './components/TurnProfit';
import Stats from './components/Stats';
import Team from './components/Team';
import EventUpload from './components/event-upload';
import TicketView from './components/TicketView';
import ReligiousPage from './pages/religiouspage';
import './style.css';
import FeedbackPage from './pages/FeedbackPage';

const HomePage = () => (
  <>
    <Herosection />
    <Feauters />
    <TurnProfit />
    <Stats />
    <Team />
  </>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event-upload" element={<EventUpload />} />
      <Route path="/ticket-view" element={<TicketView />} />
      <Route path="/religious-page" element={<ReligiousPage />} />
      <Route path="/feedback-view" element={<FeedbackPage/>} />
    </Routes>
  );
};

export default App;
