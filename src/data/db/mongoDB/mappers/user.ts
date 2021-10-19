import { Mapper } from "../../../../application/base";
import { UserBaseModel } from "../../../entities";
import { User, UserMongoDB} from "../models";

export class UserMapperMongoDB extends Mapper<UserMongoDB, UserBaseModel> {
    mapFrom(param:  UserMongoDB): UserBaseModel {
        return {
            username: param.username.toString(),
            password: param.password.toString(),
            phoneNumber:param.phoneNumber.toString(),

            id: param._id.toString(),
            createdOnUtc:param.createdAt,
            updatedOnUtc:param.updatedAt,

            firstName:param.firstName?.toString(),
            lastName:param.lastName?.toString(),
            email:param.email?.toString(),
            zipPostalCode:param.zipPostalCode?.toString(),
            address1:param.address1?.toString(),
            company:param.company?.toString(),
            country:param.country?.toString(),
            stateProvince:param.stateProvince?.toString(),
            city:param.city?.toString(),
            address2:param.address2?.toString(),
        }
    }    
    mapTo(param: UserBaseModel): UserMongoDB {
        return new User({
            username: param.username.toString(),
            password: param.password.toString(),
            phoneNumber:param.phoneNumber.toString(),
            
            firstName:param.firstName?.toString(),
            lastName:param.lastName?.toString(),
            email:param.email?.toString(),
            zipPostalCode:param.zipPostalCode?.toString(),
            address1:param.address1?.toString(),
            company:param.company?.toString(),
            country:param.country?.toString(),
            stateProvince:param.stateProvince?.toString(),
            city:param.city?.toString(),
            address2:param.address2?.toString(),
        })
    }
}