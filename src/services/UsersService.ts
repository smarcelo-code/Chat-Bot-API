import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }
  async create(email: string) {
    //Verificar se o usuário existe

    const userExists = await this.usersRepository.findOne({
      email
    })
    //Se existir, retornar User
    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    })

    await this.usersRepository.save(user);
    // Se não existir, salvar no BD
    return user;

  }
}
export { UsersService }