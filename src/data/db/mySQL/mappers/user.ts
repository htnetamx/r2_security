import { Mapper } from "../../../../application/base";
import { UserTypes } from "../../../../application/domain/user-types";
import { UserBaseModel } from "../../../entities";
import { UserMySQL} from "../models";

export class UserMapperMySQL extends Mapper<UserMySQL, UserBaseModel> {
    mapFrom(param:  UserMySQL): UserBaseModel {
        return {
            username: param.username.toString(),
            password: param.password.toString(),
            phoneNumber:param.phoneNumber.toString(),

            id: param.id.toString(),
            createdOnUtc:param.createdOnUtc,
            updatedOnUtc:param.createdOnUtc,

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
    mapTo(param: UserBaseModel): UserMySQL {
        return {
            username: param.username.toString(),
            password: param.password.toString(),
            phoneNumber:param.phoneNumber.toString(),

            id: param.id.toString(),
            createdOnUtc:param.createdOnUtc,
            updatedOnUtc:param.createdOnUtc,

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
        };
    }
}