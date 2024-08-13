import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Tabs from './component/Tabs/Tabs';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Tabs />} />
          <Route path="/colombia_dash" element={<Tabs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
