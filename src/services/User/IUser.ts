import  {IUserDocument} from '../../repositories/user';
export interface IUser{
  //Properties
  //Attribute1: type;
  
  //Mehtods
    //Objects
    userParse(params: any) : any

    //CRUDE
    createUserAsync(user: IUserDocument): Promise<IUserDocument|null>;
    updateUserByUsernameAsync(username: string,userInfo: IUserDocument): Promise<IUserDocument|null>;
    deleteUserByUsernameAsync(username: string): Promise<IUserDocument|null>;
    //Password Management
    encryptPasswordAsync(password: string): Promise<string|null>;
    checkPasswordAsync(password: string,recievedPassword:string): Promise<boolean|null>;
    //Search
    getAllUsersAsync(): Promise<Array<IUserDocument>|null>;
    getUserByUsernameAsync (username: string): Promise<IUserDocument|null>;
    getUserById (id: String): Promise<IUserDocument|null>;
    userExistsByUsernameAsync (username: string): Promise<boolean>;
    
    //Populate Field
    populateField (user: IUserDocument,field: string): Promise<IUserDocument|null>
};