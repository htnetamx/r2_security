import { Schema,Document,model} from 'mongoose';

// Role Document
export interface IRoleDocument extends Document {
    //Properties
    role: string;
};

// Role Schema
export const RoleSchema: Schema = new Schema({
    role: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true
    },
  },
  {
  timestamps: true,
  versionKey: false
});

// Role Model
export default model<IRoleDocument>('Role', RoleSchema);