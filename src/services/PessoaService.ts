import IPessoasRepository from '../repositories/IPessoasRepository';
import PessoaRepository from '../repositories/PessoaRepository';
import Pessoa from '../models/Pessoas';
import AppError from '../errors/AppError';

interface User{
  id?: string;
  nome?: string;
  email?: string;
  senha?: string
}

interface Request{
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  user: User;
}
class PessoaService{

  private pessoaRepository: IPessoasRepository;
  constructor(pessoaRepository: PessoaRepository) {
    this.pessoaRepository = pessoaRepository;
   }
  public async criarPessoa({ nome, email, telefone, user }: Request): Promise<Pessoa> {
    this.campoVazio({ nome, email, telefone, user });
    const pessoaDB = await this.pessoaRepository.findByEmail(email, user);
    if(pessoaDB){
      throw new AppError('Você já cadastrou esse email', 400)
    }
    
    const pessoa = this.pessoaRepository.create({
      nome,
      email,
      telefone,
      user
    })
    
    return pessoa;
  }

  public async listarPessoas(id: string): Promise<Pessoa[]> {
    const pessoa = this.pessoaRepository.findAll(id)
    return pessoa;
  }

  public async atualizarPessoa({id,nome, email, telefone}: Request): Promise<Pessoa>{
    const buscarPessoa = await this.acharPessoaId(id)
    if(email === buscarPessoa.email){
      throw new AppError('Email já existe', 400)
    }

    buscarPessoa.nome = nome;
    buscarPessoa.email = email;
    buscarPessoa.telefone = telefone
    const pessoa = this.pessoaRepository.save(buscarPessoa);

    return pessoa
  }

  async acharPessoaId(id: string){
    const pessoa = await this.pessoaRepository.findById(id);
    if(!pessoa){
      throw new AppError('Pessoa não encontrada', 400);
    }

    return pessoa
  }

  private campoVazio(request: Request){
    const {email, nome, telefone,user} = request
    if(nome === '' || nome === null){
      throw new AppError('Campo nome não pode ser vazio', 400)
    }

    if(email === '' || email === null){
      throw new AppError('Campo email não pode ser vazio', 400)
    }

    if(telefone === '' || telefone === null){
      throw new AppError('Campo telefone não pode ser vazio', 400)
    }

    if(user.id === '' || user.id === null){
      throw new AppError('Campo telefone não pode ser vazio', 400)
    }


  }

  public async deletaPessoa(id: string): Promise<string>{
    const buscarPessoa = await this.acharPessoaId(id)
    if(!buscarPessoa){
      throw new AppError('Essa pessoa não existe na base de dados', 400)
    }
    try{
      await this.pessoaRepository.deleteOne(id)
      return 'Pessoa deletada com sucesso';
    }catch(erro){ 
      throw new AppError('Erro ao deleta essa pessoa', 400)
    }
   
     
  }

}

export default PessoaService