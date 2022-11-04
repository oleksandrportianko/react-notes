import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/main/main.page';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
