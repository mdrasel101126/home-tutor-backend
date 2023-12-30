import { Model } from 'mongoose';

export type IFeedback = {
  name: string;
  role: 'Tutor' | 'Public';
  feedback: string;
};

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;
