import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-md-6" key={team._id || team.id || team.name}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{team.name}</h5>
              <p className="text-muted">Members: {Array.isArray(team.members) ? team.members.length : 0}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
