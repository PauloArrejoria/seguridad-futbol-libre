import { auth } from "firebase-admin";
import { UserCreateRequestDto } from "./user-create-request-dto";
import { ValidationError } from "@application/validation-error";
import { sequelize } from "@infrastructure/sql";
import { QueryTypes } from 'sequelize';


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

        // Asi estaba antes
        // const query = `
        //     INSERT INTO Users (createdAt, updatedAt, uid, name, resumme)
        //     VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${uid}', '${dto.email}', '${dto.resumme}');`;
        // await sequelize.query(query);

        // Asi ahora implementando una forma segura de insertar datos usando prepared statements con Sequelize
        // Al utilizar :uid, :name, :resumme como marcadores de posición y pasar sus valores a través del objeto replacements, Sequelize se encarga de escapar y parametrizar los datos de forma segura antes de enviarlos a la base de datos. Esto previene eficazmente la inyección SQL.    
        const query = `
            INSERT INTO Users (createdAt, updatedAt, uid, name, resumme)
            VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :uid, :name, :resumme);
            `;

            await sequelize.query(query, {
            replacements: {
                uid: uid,
                name: dto.email, // Asumiendo que 'name' en tu tabla es el email
                resumme: dto.resumme
            },
            type: QueryTypes.INSERT
            });

        
        return uid;
    } catch(err) {
        throw new ValidationError(err?.errorInfo?.message ?? 'Error');
    }
}

export {
    createUser,
    UserCreateRequestDto
}