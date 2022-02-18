export class TarjetaCredito{
    id?: string; 
    titular: string;
    numeroTarjeta: string;
    fechaExp: string;
    cvv: number;
    fechaEmi: Date;
    fechaActualizacion: Date;

    constructor( titular: string, numeroTarjeta: string, fechaExp: string, cvv: number){
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExp = fechaExp;
        this.cvv = cvv;
        this.fechaEmi = new Date();
        this.fechaActualizacion = new Date();
    }
}