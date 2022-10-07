export class userAdminModel {
    id?: string;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    repetirPassword: string;


    constructor(nombre:string,apellido:string,correo: string,password: string,repetirPassword: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.password = password;
        this.repetirPassword = repetirPassword;
        
    }
    
    

}