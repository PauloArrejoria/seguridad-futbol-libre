import { getAuth } from "firebase-admin/auth";
import { UserListResponseDto } from "./user-list-response-dto";

const getUserList = async (): Promise<Array<UserListResponseDto>> => {
    const listedResult = await getAuth().listUsers();
    const response = listedResult.users.map(user => new UserListResponseDto(
        user.uid,
        user.email,
        ''
    ));

    return response;
}

export {
    getUserList,
}