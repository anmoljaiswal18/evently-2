import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Herosection from './components/Herosection';
import Feauters from './components/Feauters';
import TurnProfit from './components/TurnProfit';
import Stats from './components/Stats';
import Team from './components/Team';
import EventUpload from './components/event-upload';
import TicketView from './components/TicketView';
import './style.css';
const HomePage = () => (_jsxs(_Fragment, { children: [_jsx(Herosection, {}), _jsx(Feauters, {}), _jsx(TurnProfit, {}), _jsx(Stats, {}), _jsx(Team, {})] }));
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/event-upload", element: _jsx(EventUpload, {}) }), _jsx(Route, { path: "/ticket-view", element: _jsx(TicketView, {}) })] }));
};
export default App;
