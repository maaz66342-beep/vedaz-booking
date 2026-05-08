import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_EXPERTS = [
  { _id: '1', name: "Dr. Sharma", expertise: "Cardiology", price: 500, rating: 4.8 },
  { _id: '2', name: "CA Mehta", expertise: "Taxation", price: 800, rating: 4.9 },
  { _id: '3', name: "Adv. Khan", expertise: "Legal", price: 1000, rating: 4.7 },
];

function ExpertList() {
  const [experts] = useState(MOCK_EXPERTS);
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('');

  const filtered = experts.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (expertise === '' || e.expertise === expertise)
  );

  return (
    <div style={{padding: '20px'}}>
      <h2>Find an Expert</h2>
      <input
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{padding: '8px', marginRight: '10px', width: '200px'}}
      />
      <select value={expertise} onChange={e => setExpertise(e.target.value)} style={{padding: '8px'}}>
        <option value="">All Expertise</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Taxation">Taxation</option>
        <option value="Legal">Legal</option>
      </select>

      <div style={{marginTop: '20px'}}>
        {filtered.map(expert => (
          <div key={expert._id} style={{border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px'}}>
            <h3>{expert.name}</h3>
            <p>Expertise: {expert.expertise} | Price: ₹{expert.price} | Rating: {expert.rating}⭐</p>
            <Link to={`/expert/${expert._id}`}>
              <button style={{padding: '8px 15px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                View Slots
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ExpertList;