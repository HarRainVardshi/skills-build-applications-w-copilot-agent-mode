import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, trim: true },
  members: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
