import { getRepository, Repository } from "typeorm";
import ICreatePessoaDTO from "../dto/ICreatePessoaDTO";
import Pessoa from "../models/Pessoas";
import IPessoasRepository from "./IPessoasRepository";

class PessoaRepository implements IPessoasRepository {
  private ormRepository: Repository<Pessoa>;
  constructor() {
    this.ormRepository = getRepository(Pessoa)
  }
 
  public async findAll(id: string): Promise<Pessoa[]> {
    return this.ormRepository.find(
      {
        where: {user: id }
      }
    );
  }
  public async findAllPaginated(page: number): Promise<[Pessoa[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10
    })
  }
  public async findById(id: string): Promise<Pessoa | undefined> {
    return this.ormRepository.findOne({
      where: {id}
    })
  }
  public async findByEmail(email: string): Promise<Pessoa | undefined> {
    return this.ormRepository.findOne({
      where:{email}
    })
  }

  public async create({nome, email, telefone, user}: ICreatePessoaDTO): Promise<Pessoa> {
    const pessoa = this.ormRepository.create({
      nome,
      telefone,
      email,
      user
    });
    console.log('pessoa', pessoa);
    
    await this.ormRepository.save(pessoa)
      .then(data => console.log(data))
      .catch(error => console.log(error));
    

    return pessoa;
  }

  public async save(pessoa: Pessoa): Promise<Pessoa> {
    return this.ormRepository.save(pessoa)
  }

  async deleteOne(id: string): Promise<void> {
    const pessoa =  await this.findById(id);
    this.ormRepository.remove(pessoa)
  }

}

export default PessoaRepository;