import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'; 
import Posts from './components/Posts';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Posts/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
