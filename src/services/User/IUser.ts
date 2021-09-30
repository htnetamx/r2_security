import { Model, model } from 'mongoose';
import { UserSchema,IUserDocument } from '../../repositories/user';

// document
export interface IUser extends IUserDocument {
  // Methods
  methodExample():string;
}

// model
export interface IUserModel extends Model<IUser> {
  // Static Methods
  cypherPasswordAsync(password:String): Promise<string>;
  comparePasswordAsync(password:String,recievedPassword:String): Promise<boolean>;
  getAllUsersAsync(username: string): Promise<Array<IUserDocument>>
  findByUserNameAsync(username: string): Promise<IUserDocument>;
  createUserAsync(user: IUserDocument): Promise<IUserDocument>;
  
}

export const IUser: IUserModel = model<IUser, IUserModel>('User', UserSchema);