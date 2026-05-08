import { useState } from 'react';

const MOCK_BOOKINGS = [
  { _id: 'b1', expertId: {name: "Dr. Sharma"}, date: "2026-05-11", time: "10:00 AM", status: "Confirmed", userName: "Test User" }
];

function MyBookings() {
  const [bookings] = useState(MOCK_BOOKINGS);

  return (
    <div style={{padding: '20px'}}>
      <h2>My Bookings</h2>
      {bookings.length === 0? <p>No bookings yet</p> :
        bookings.map(b => (
          <div key={b._id} style={{border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px'}}>
            <h4>{b.expertId.name}</h4>
            <p>Date: {b.date} | Time: {b.time}</p>
            <p>Status: <span style={{color: b.status === 'Confirmed'? 'green' : 'red', fontWeight: 'bold'}}>{b.status}</span></p>
          </div>
        ))
      }
    </div>
  );
}
export default MyBookings;