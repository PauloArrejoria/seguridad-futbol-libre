import { auth } from "firebase-admin";
import { UserCreateRequestDto } from "./user-create-request-dto";
import { ValidationError } from "@application/validation-error";
import { sequelize } from "@infrastructure/sql";

const createUser = async (dto: UserCreateRequestDto): Promise<string> => {
    //TODO: Validate email format
    if (!dto.email || !dto.password) {
        throw new ValidationError("The email and password are required values.");
    }
    
    try {
        const { uid } = await auth().createUser({ 
            email: dto.email,
            password: dto.password
        });

        const query = `
            INSERT INTO Users (createdAt, updatedAt, uid, name, resumme)
            VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${uid}', '${dto.email}', '${dto.resumme}');`;
        await sequelize.query(query);
        
        return uid;
    } catch(err) {
        throw new ValidationError(err?.errorInfo?.message ?? 'Error');
    }
}

export {
    createUser,
    UserCreateRequestDto
}