import { Request, Response } from 'express';
import PessoaRepository from '../repositories/PessoaRepository';
import PessoaService from '../services/PessoaService';

class PessoaController{

  public async create(request: Request, response: Response) {
    
    const { nome, email, telefone, user} = request.body;
    const pessoaRepository = new PessoaRepository();
    const createPessoa = new PessoaService(pessoaRepository);
    const client = await createPessoa.criarPessoa({
      nome,
      email,
      telefone,
      user
    });

    return response.status(201).json(client);
  }

  public async update(request: Request, response: Response) {
    
    const { id } = request.params;
    const { nome, email, telefone, user} = request.body;
    const pessoaRepository = new PessoaRepository();
    const updatePessoa = new PessoaService(pessoaRepository);
    const client = await updatePessoa.atualizarPessoa({
      id,
      nome,
      email,
      telefone,
      user
    });

    return response.json(client);
  }

  public async list(request: Request, response: Response){
    const {id} = request.params;
    const pessoaRepository = new PessoaRepository();
    const listPessoas = new PessoaService(pessoaRepository);
    const pessoas = await listPessoas.listarPessoas(id);

    return response.json(pessoas);
  }

  public async buscarPessoa(request: Request, response: Response){
    const {id} = request.params;
    const pessoaRepository = new PessoaRepository();
    const buscarPessoaId = new PessoaService(pessoaRepository);
    const pessoa = await buscarPessoaId.acharPessoaId(id)

    return response.json(pessoa)
  }

  public async deletaPessoa(request: Request, response: Response){
    const {id} = request.params;
    const pessoaRepository = new PessoaRepository();
    const buscarPessoaId = new PessoaService(pessoaRepository);
    const pessoa = await buscarPessoaId.deletaPessoa(id)

    return response.json(pessoa)
  }
}

export default PessoaController;