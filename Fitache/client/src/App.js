// Client/Src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import FitnessDashboard from './ClientFitnessDashboard';
import ClientLogin from './ClientLogin';
import Register from './ClientRegister';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PrivateRoute from './privateRoute'; // Add this import

function App() {
  const logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <nav>
          {/* Add more navigation links here */}
          <Link to="/dashboard">Fitness Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button onClick={logout}>Logout</button> {/* Add a logout button */}
        </nav>
        <Routes>
          {/* Add more routes here */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<FitnessDashboard />} />
          </Route>
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
