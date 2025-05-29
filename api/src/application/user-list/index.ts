import { UserListResponseDto } from "./user-list-response-dto";
import { UserModel } from "@infrastructure/models/user";

const getUserList = async (): Promise<Array<UserListResponseDto>> => {
    const users = await UserModel.findAll({ raw : true });
    const response = users.map(user => new UserListResponseDto(
        user.id,
        user.name,
        user.resumme    
    ));

    return response;
}

export {
    getUserList,
}