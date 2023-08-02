import { Schema, model, Document } from 'mongoose';

interface Review extends Document {
  rating: number;
  comment: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

const reviewSchema = new Schema<Review>({
  rating: { type: Number, required: true, min: 1, max: 5 }, // Establecer límites mínimos y máximos
  comment: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<Review>('Review', reviewSchema);
