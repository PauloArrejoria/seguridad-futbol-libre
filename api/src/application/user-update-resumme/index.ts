import { UpdateResummeDto } from "./user-update-resumme-dto";
import { UserModel } from "@infrastructure/models/user";

const updateUserResumme = async (dto: UpdateResummeDto): Promise<void> => { 
    await UserModel.update(
        {
            resumme: dto.resumme,
            updatedAt: new Date()
        },
        { where: { id: dto.id } }
    );
}

export {
    UpdateResummeDto,
    updateUserResumme,
}