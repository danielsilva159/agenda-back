import ICreatePessoaDTO from '../dto/ICreatePessoaDTO';
import User from '../interfaces/user';
import Pessoa from '../models/Pessoas';

export default interface IPessoasRepository {
  findAll(id: string): Promise<Pessoa[]>;
  findAllPaginated(page: number): Promise<[Pessoa[], number]>;
  findById(id: string): Promise<Pessoa | undefined>;
  findByEmail(email: string, user: User): Promise<Pessoa | undefined>;
  create(createPessoaDTO: ICreatePessoaDTO): Promise<Pessoa>;
  save(pessoa: Pessoa): Promise<Pessoa>;
  deleteOne(id: string): Promise<void>
}
