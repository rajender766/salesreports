/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';

import './App.css';

import SignIn from './components/Authentication/Login';
import NotFound from './components/NotFound';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/salesdata'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
