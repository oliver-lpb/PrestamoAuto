export class userModel {
    id?: string;
    nombre: string;
    apellido: string;
    dpi: number;
    correo: string;
    direccion: string;
    fechaCreacion: Date;
    fehcaActualizacion: Date;

    constructor(nombre:string,apellido:string,dpi: number,correo: string,direccion: string,fechaCreacion:Date,fehcaActualizacion: Date){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dpi = dpi;
        this.correo = correo;
        this.direccion = direccion;
        this.fechaCreacion = new Date();
        this.fehcaActualizacion = new Date();
    }
    
    

}