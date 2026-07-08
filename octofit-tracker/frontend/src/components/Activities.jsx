import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.results || [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row g-3">
      {activities.map((activity) => (
        <div className="col-md-6" key={activity._id || activity.id || activity.date}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{activity.type}</h5>
              <p className="mb-1"><strong>Duration:</strong> {activity.duration} min</p>
              <p className="text-muted mb-0">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;
