import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
