export class Pedido {

    valorTotal: number; 
    cpf: string;
    nomeCliente: string;
    titulos: string[];

    constructor(valorTotal: number, cpf: string, nomeCliente: string, titulos: string[]) {
        this.valorTotal = valorTotal;
        this.cpf = cpf;
        this.nomeCliente = nomeCliente;
        this.titulos = titulos
    }
}