import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import Feauters from './components/Feauters';
import Herosection from './components/Herosection';
import Stats from './components/Stats';
import Team from './components/Team';
import TurnProfit from './components/TurnProfit';
import './style.css';
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Herosection, {}), _jsx(Feauters, {}), _jsx(TurnProfit, {}), _jsx(Stats, {}), _jsx(Team, {})] }));
};
export default App;
