import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../utils/socket';

const MOCK_EXPERTS = {
  '1': { _id: '1', name: "Dr. Sharma", expertise: "Cardiology", price: 500, rating: 4.8,
    slots: [
      {date:"2026-05-11", time:"10:00 AM", booked:false},
      {date:"2026-05-11", time:"11:00 AM", booked:true},
      {date:"2026-05-11", time:"12:00 PM", booked:false}
    ]
  },
  '2': { _id: '2', name: "CA Mehta", expertise: "Taxation", price: 800, rating: 4.9,
    slots: [
      {date:"2026-05-12", time:"2:00 PM", booked:false},
      {date:"2026-05-12", time:"3:00 PM", booked:false}
    ]
  },
  '3': { _id: '3', name: "Adv. Khan", expertise: "Legal", price: 1000, rating: 4.7,
    slots: [
      {date:"2026-05-13", time:"4:00 PM", booked:false},
      {date:"2026-05-13", time:"5:00 PM", booked:false}
    ]
  }
};

function ExpertProfile() {
  const { id } = useParams();
  const [expert, setExpert] = useState(MOCK_EXPERTS[id]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    socket.on('slot-booked', ({ expertId, date, time }) => {
      if (expertId === id) {
        alert(`Slot ${date} ${time} just got booked by someone else!`);
        setExpert(prev => ({
      ...prev,
          slots: prev.slots.map(s =>
            s.date === date && s.time === time? {...s, booked: true} : s
          )
        }));
      }
    });
    return () => socket.off('slot-booked');
  }, [id]);

  const handleBook = () => {
    if (!selectedSlot ||!userName ||!userEmail) return alert('Fill all fields');
    setExpert(prev => ({
  ...prev,
      slots: prev.slots.map(s =>
        s.date === selectedSlot.date && s.time === selectedSlot.time? {...s, booked: true} : s
      )
    }));
    socket.emit('slot-booked', { expertId: id, date: selectedSlot.date, time: selectedSlot.time });
    alert('Booking Confirmed! Check My Bookings page.');
    setSelectedSlot(null);
    setUserName('');
    setUserEmail('');
  };

  if (!expert) return <div style={{padding: '20px'}}>Loading...</div>;

  return (
    <div style={{padding: '20px'}}>
      <h2>{expert.name}</h2>
      <p>{expert.expertise} | ₹{expert.price} | {expert.rating}⭐</p>
      <h3>Available Slots:</h3>
      {expert.slots.map((slot, i) => (
        <button
          key={i}
          disabled={slot.booked}
          onClick={() => setSelectedSlot(slot)}
          style={{
            padding: '10px', margin: '5px',
            background: slot.booked? '#ccc' : selectedSlot === slot? '#4caf50' : '#2196f3',
            color: 'white', border: 'none', borderRadius: '4px', cursor: slot.booked? 'not-allowed' : 'pointer'
          }}
        >
          {slot.date} {slot.time} {slot.booked? '(Booked)' : ''}
        </button>
      ))}

      {selectedSlot && (
        <div style={{marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px'}}>
          <h4>Book: {selectedSlot.date} {selectedSlot.time}</h4>
          <input placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} style={{display: 'block', margin: '10px 0', padding: '8px', width: '250px'}} />
          <input placeholder="Your Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} style={{display: 'block', margin: '10px 0', padding: '8px', width: '250px'}} />
          <button onClick={handleBook} style={{padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
export default ExpertProfile;