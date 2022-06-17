import GetRolesByUserUseCase from "./GetRolesByUserUseCase";
import getRestController from "../../controllers/rest";

const restController = getRestController();

export function getRolesByUserUseCase() {
    return new GetRolesByUserUseCase(restController);
}
