import { Schema, model, Document } from 'mongoose';

interface Comment extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<Comment>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<Comment>('Comment', commentSchema);
