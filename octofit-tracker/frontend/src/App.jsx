import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
          <h1 className="display-6 fw-bold mb-3">Modern fitness tracking for every team.</h1>
          <p className="lead text-muted mb-3">
            Browse users, teams, workouts, and activity insights from the API tier.
          </p>
          <div className="alert alert-info mb-0">
            Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs. When it is not set, the app falls back to localhost.
          </div>
          {codespaceName ? (
            <p className="text-muted mt-3 mb-0">Codespaces target: {codespaceName}</p>
          ) : null}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-semibold">OctoFit</span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <section className="card shadow-sm border-0">
        <div className="card-body p-4">
          <Routes>
            <Route path="/" element={
              <div>
                <h2 className="h4 mb-3">Overview</h2>
                <p className="text-muted">Use the navigation above to inspect users, teams, activities, leaderboard entries, and workouts.</p>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </section>
    </main>
  );
}

export default App;
