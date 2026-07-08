"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
const createCrudRoutes = (model, basePath) => {
    router.get(basePath, async (_req, res) => {
        try {
            const items = await model.find();
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to fetch items', error });
        }
    });
    router.post(basePath, async (req, res) => {
        try {
            const item = new model(req.body);
            await item.save();
            res.status(201).json(item);
        }
        catch (error) {
            res.status(400).json({ message: 'Failed to create item', error });
        }
    });
};
createCrudRoutes(user_1.User, '/api/users/');
createCrudRoutes(team_1.Team, '/api/teams/');
createCrudRoutes(activity_1.Activity, '/api/activities/');
createCrudRoutes(leaderboard_1.LeaderboardEntry, '/api/leaderboard/');
createCrudRoutes(workout_1.Workout, '/api/workouts/');
exports.default = router;
