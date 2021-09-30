import  {IUserDocument} from '../../repositories/user';
export interface IUser{
  //Properties
  //Attribute1: type;
  
  //Mehtods
    //Objects
    userParse(params: any) : any

    //CRUDE
    getAllUsersAsync(): Promise<Array<IUserDocument>|null>;
    getUserByNameAsync (username: string): Promise<IUserDocument|null>;
    createUserAsync(user: IUserDocument): Promise<IUserDocument|null>;
    updateUserByUsernameAsync(username: String,userInfo: IUserDocument): Promise<IUserDocument|null>;
    deleteUserByUsernameAsync(username: string): Promise<IUserDocument|null>;
    //Verification
    encryptPasswordAsync(password: string): Promise<string|null>;
    checkPasswordAsync(password: string,recievedPassword:string): Promise<boolean|null>;
};