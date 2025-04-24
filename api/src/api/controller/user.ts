import { Request, Response, NextFunction } from "express";
import { createUser, UserCreateRequestDto } from "@application/user-create";
import { getUserList } from "@application/user-list";
import { updateUserResumme, UpdateResummeDto } from "@application/user-update-resumme";

const Create = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const requestDto = new UserCreateRequestDto(
            request.body.name,
            request.body.password,
            request.body.resumme
        );
        await createUser(requestDto);

        response.send();
    }
    catch (err)
    {
        next(err);
    }
}

const UpdateResumme = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const requestDto = new UpdateResummeDto(
            request.params.id,
            request.body.resumme
        );
        await updateUserResumme(requestDto);

        response.send();
    }
    catch (err)
    {
        next(err);
    }
}

const GetList = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const dto = await getUserList();
        response.send(dto);
    }
    catch (err)
    {
        next(err);
    }
}

export {
    Create,
    GetList,
    UpdateResumme
}
