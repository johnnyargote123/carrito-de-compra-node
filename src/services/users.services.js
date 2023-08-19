import { userRepository } from "../dao/repositories/users.repository";
import UserDTO from "../dao/dtos/user.dto";


export default class UserService {
    constructor(){}

    getusers = async () => {
        const users = await userRepository.getUsers()
        return users
    }
}