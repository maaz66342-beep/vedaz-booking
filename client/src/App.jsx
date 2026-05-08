import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ExpertList from './pages/ExpertList';
import ExpertProfile from './pages/ExpertProfile';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{padding: '15px', background: '#1976d2', color: 'white'}}>
          <Link to="/" style={{color: 'white', marginRight: '20px', textDecoration: 'none'}}>Experts</Link>
          <Link to="/bookings" style={{color: 'white', textDecoration: 'none'}}>My Bookings</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ExpertList />} />
          <Route path="/expert/:id" element={<ExpertProfile />} />
          <Route path="/bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;