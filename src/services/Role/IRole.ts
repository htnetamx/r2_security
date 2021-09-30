import { Model, model } from 'mongoose';
import { RoleSchema,IRoleDocument} from '../../repositories/role';

// document
export interface IRole extends IRoleDocument {
  // Methods
  methodExample():string;
}

// model
export interface IRoleModel extends Model<IRole> {
  // Static Methods
  findByRole(role: string): Promise<IRoleDocument>;
}

export const Role: IRoleModel = model<IRole, IRoleModel>('Role', RoleSchema);