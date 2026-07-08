import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row g-3">
      {users.map((user) => (
        <div className="col-md-6" key={user._id || user.id || user.email}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="text-muted mb-2">{user.email}</p>
              <p className="mb-1"><strong>Goals:</strong> {Array.isArray(user.goals) ? user.goals.join(', ') : '—'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;
