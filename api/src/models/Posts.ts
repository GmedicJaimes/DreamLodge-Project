import { Schema, model, Document, Types } from 'mongoose';

interface Post extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // Utiliza Types.ObjectId para representar el ObjectId
  createdAt: Date;
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<Post>('Post', postSchema);
