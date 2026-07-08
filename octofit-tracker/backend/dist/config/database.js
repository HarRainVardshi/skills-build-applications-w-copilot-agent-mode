"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const connectToDatabase = async () => {
    await mongoose_1.default.connect(connectionString);
    console.log('Connected to octofit_db');
};
exports.connectToDatabase = connectToDatabase;
const closeDatabaseConnection = async () => {
    await mongoose_1.default.disconnect();
};
exports.closeDatabaseConnection = closeDatabaseConnection;
exports.default = mongoose_1.default.connection;
