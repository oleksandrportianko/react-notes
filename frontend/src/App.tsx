import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch } from './redux/hooks';
import { getUserThunk } from './redux/slices/auth.slice';

import MainPage from './pages/main/main.page';
import Alert from './components/alert/alert.component';

import './App.css';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserThunk())
  }, [])

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
