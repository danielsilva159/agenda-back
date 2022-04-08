import IcreateUserDTO from "./IcreateUserDTO";

export default interface ICreatePessoaDTO{
  nome: string;
  email: string;
  telefone: string;
  user: IcreateUserDTO;
}