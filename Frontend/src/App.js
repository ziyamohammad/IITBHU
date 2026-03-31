
import './App.css';
import Home from "./components/Home"

import { BrowserRouter as Router,Routes,Route } from 'react-router';
import Predict from './components/Predict';

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/predict/:smile" element={<Predict/>}/>
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
