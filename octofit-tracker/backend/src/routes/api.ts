import { Router } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

const createCrudRoutes = (model: any, basePath: string) => {
  const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const alternateBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;

  const registerHandler = (path: string) => {
    router.get(path, async (_req, res) => {
      try {
        const items = await model.find();
        res.json(items);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error });
      }
    });

    router.post(path, async (req, res) => {
      try {
        const item = new model(req.body);
        await item.save();
        res.status(201).json(item);
      } catch (error) {
        res.status(400).json({ message: 'Failed to create item', error });
      }
    });
  };

  registerHandler(normalizedBasePath);
  registerHandler(alternateBasePath);
};

createCrudRoutes(User, '/api/users');
createCrudRoutes(Team, '/api/teams');
createCrudRoutes(Activity, '/api/activities');
createCrudRoutes(LeaderboardEntry, '/api/leaderboard');
createCrudRoutes(Workout, '/api/workouts');

export default router;
