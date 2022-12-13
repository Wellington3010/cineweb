export class TicketRegister {
    
    titulo: string;
    preco: number;
    quantidade: number;

    constructor(titulo: string, preco: number, quantidade: number) {
        this.titulo = titulo;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}