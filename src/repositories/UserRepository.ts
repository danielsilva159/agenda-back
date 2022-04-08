import { getRepository, Repository } from "typeorm";
import IcreateUserDTO from "../dto/IcreateUserDTO";
import User from "../models/User";
import IUserRepository from "./IUserRepository";

 
 class UserRepository implements IUserRepository{
   private ormRepository: Repository<User>

   constructor() {
    this.ormRepository = getRepository(User)
  }
   findAll(): Promise<User[]> {
    return this.ormRepository.find();
   }
   findAllPaginated(page: number): Promise<[User[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10
    })
   }
   findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {id}
    })
   }
   findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where:{email}
    })
   }
   async create(createUserDTO: IcreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      nome: createUserDTO.nome, 
      email: createUserDTO.email, 
      senha: createUserDTO.senha
    });
    await this.ormRepository.save(user);

    return user;
   }
   save(User: User): Promise<User> {
    return this.ormRepository.save(User)
   }

}

export default UserRepository;