
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Database from './pages/Database'; // Import your Database component
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Hero from './components/Hero';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-800">
      <Router>
          <header>
              <TopBar />
          </header>
          <Routes>
            <Route path="/" element={<Hero/>}/>
            <Route path="/database" element={<Database/>}/>
          </Routes>
          <Footer />
      </Router>
    </div>
  );
};

export default App;