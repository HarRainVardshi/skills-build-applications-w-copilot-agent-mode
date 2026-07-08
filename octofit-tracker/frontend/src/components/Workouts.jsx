import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div className="col-md-6" key={workout._id || workout.id || workout.title}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{workout.title}</h5>
              <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
              <p className="text-muted mb-0">Duration: {workout.duration} min</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Workouts;
