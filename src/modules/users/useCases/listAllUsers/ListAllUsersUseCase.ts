import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const verifyIfAdmin = this.usersRepository.findById(user_id);

    if (verifyIfAdmin.admin !== true) {
      throw new Error("User is not an administrator");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
