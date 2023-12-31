import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser: User = new User();
    const date = new Date();

    Object.assign(newUser, {
      name,
      email,
      created_at: date,
      updated_at: date,
      admin: false,
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const updateUser = this.users.find((user) => user === receivedUser);

    updateUser.admin = true;

    return updateUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
