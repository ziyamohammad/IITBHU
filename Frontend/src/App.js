import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"

import { BrowserRouter as Router,Routes,Route } from 'react-router';
import Predict from './components/Predict';
import Team from './components/Team';

import Active from './components/Active';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Team" element={<Team/>}/>
          <Route path="/About" element={<Active/>}/>
          <Route path="/predict/:smile" element={<Predict/>}/>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
