import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/main/main.page';
import Alert from './components/alert/alert.component';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
      <Alert />
    </div>
  );
}

export default App;
