
import { Schema,Document } from 'mongoose';
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
        unique: true },
    },
    
    {
    timestamps: true,
    versionKey: false
});
// method
RoleSchema.methods.methodExample = function (): string {
  return "Method Working";
}

// static method
RoleSchema.statics.findByRole = function (role: string): Promise<IRoleDocument> {
  return this.findOne({ role })
};