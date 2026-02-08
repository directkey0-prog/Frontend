import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Dummy data
    const dummyRequests = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      property_id: i + 1,
      payment_status: Math.random() > 0.5 ? 'paid' : 'pending',
      property: {
        map_link: Math.random() > 0.5 ? `https://maps.google.com/?q=${i + 1}` : null
      }
    }));
    setRequests(dummyRequests);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tenant Dashboard</h1>
      <h2 className="text-2xl mb-4">My Connection Requests</h2>
      <div className="space-y-4">
        {requests.map(req => (
          <div key={req.id} className="border p-4 rounded">
            <p>Property: {req.property_id}</p>
            <p>Status: {req.payment_status}</p>
            {req.payment_status === 'paid' && req.property.map_link && (
              <a href={req.property.map_link} className="text-blue-500">View Map</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;