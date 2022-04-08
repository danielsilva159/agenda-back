import IcreateUserDTO from '../dto/IcreateUserDTO';
import User from '../models/User';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findAllPaginated(page: number): Promise<[User[], number]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(createUserDTO: IcreateUserDTO): Promise<User>;
  save(User: User): Promise<User>;
}
