import { Schema, model } from 'mongoose';
import { FeedbackModel, IFeedback } from './feedback.interface';

const feedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Tutor', 'Public'],
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = model<IFeedback, FeedbackModel>('Feedback', feedbackSchema);

export default Feedback;
