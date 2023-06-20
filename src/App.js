import { Routes, Route } from 'react-router-dom';

import './App.css';

import Dashboard from './components/Dashboard';
//import Register from './components/Authentication/Sinup';
import SignIn from './components/Authentication/Login';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      {/* <Route path='/register' element={<Register />} /> */}
      <Route path='/' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
