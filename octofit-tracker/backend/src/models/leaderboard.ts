import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, trim: true },
  score: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
