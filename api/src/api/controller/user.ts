import { Request, Response, NextFunction } from "express";
import { createUser, UserCreateRequestDto } from "@application/user-create";
import { getUserList } from "@application/user-list";

const Create = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const requestDto = new UserCreateRequestDto(
            request.body.name,
            request.body.password
        );
        await createUser(requestDto);

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
    GetList
}
