import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<User>('User', userSchema);
