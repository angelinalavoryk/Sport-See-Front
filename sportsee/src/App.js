import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Community from './pages/community/Community';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<Home />} />
          <Route path="/profil" element={<Dashboard />} />
        <Route path="/reglages" element={<Settings />} />
         <Route path="/communaute" element={<Community />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;






















