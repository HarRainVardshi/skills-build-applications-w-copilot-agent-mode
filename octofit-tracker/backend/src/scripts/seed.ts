import { connectToDatabase, closeDatabaseConnection } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await connectToDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        goals: ['Run 5k', 'Improve mobility'],
      },
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        goals: ['Increase strength', 'Stretch daily'],
      },
      {
        name: 'Sage Patel',
        email: 'sage.patel@example.com',
        goals: ['Cycle twice a week', 'Recover better'],
      },
    ]);

    await Team.insertMany([
      {
        name: 'North Stars',
        members: users.slice(0, 2).map((user) => user._id.toString()),
      },
      {
        name: 'Weekend Warriors',
        members: [users[2]._id.toString()],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        duration: 32,
        date: new Date('2026-07-01T07:30:00Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        duration: 45,
        date: new Date('2026-07-02T18:00:00Z'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Cycling',
        duration: 60,
        date: new Date('2026-07-03T06:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), score: 980, rank: 1 },
      { userId: users[1]._id.toString(), score: 912, rank: 2 },
      { userId: users[2]._id.toString(), score: 887, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Core Blast',
        difficulty: 'Intermediate',
        duration: 20,
      },
      {
        title: 'Endurance Loop',
        difficulty: 'Advanced',
        duration: 35,
      },
      {
        title: 'Recovery Flow',
        difficulty: 'Beginner',
        duration: 15,
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await closeDatabaseConnection();
  }
}

seedDatabase();
