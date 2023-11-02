import './App.css';

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Header from './components/header/Header';
import StreamerProfile from './pages/StreamerProfile';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streamer/:login" element={<StreamerProfile />} />
      </Routes>
    </div>
  );
}

export default App;
