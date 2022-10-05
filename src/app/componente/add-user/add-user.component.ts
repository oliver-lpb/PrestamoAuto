import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//para la manipulacion del formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importacion del modelo
import { userModel } from 'src/app/models/user.model';
//importacion de servicio
import { DatosService } from 'src/app/services/datos.service';
//modal

import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  //id para busacar
  id: string | null;
  //validacion de correo
  submitted = false;

  @Output() seleccionado: EventEmitter<boolean>;

  constructor(
    private fb: FormBuilder,
    private dataServices: DatosService,
    private aRote: ActivatedRoute,
    private router: Router
  ) {
    //Valdacion de formulario
    this.id = this.aRote.snapshot.paramMap.get('id');
    console.log(this.id);
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dpi: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
    });

    this.seleccionado = new EventEmitter();
  }

  form: FormGroup;
  loading = false;
  titulo = 'Agregar Cliente';

  ngOnInit(): void {
    this.leerEditar();
  }

  agregarEditar() {
    if (this.id === null) {
      this.registerUser();
    } else {
      this.actualizarUsuario(this.id);
    }
  }

  registerUser() {
    console.log(this.form);
    this.submitted = true;
    //condicion para validar formulario
    if (this.form.invalid) {
      return;
    }
    const User: any = {
      nombre: this.form.value.nombre, //quite el null
      apellido: this.form.value.apellido,
      dpi: this.form.value.dpi,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      fechaCreacion: new Date(),
      fehcaActualizacion: new Date(),
    };
    this.loading = true;
    this.dataServices.saveUser(User).then(
      () => {
        this.loading = false;
        console.log('Bien', 'Tarjeta registrada');
        this.form.reset();
      },
      (error) => {
        this.loading = false;
        console.log('Erro', 'error');
        console.log(error);
      }
    );
      this.seleccionado.emit(false);
    
  }

  actualizarUsuario(id: string) {
    this.submitted = true;
    //condicion para validar formulario
    if (this.form.invalid) {
      return;
    }
    const User: any = {
      nombre: this.form.value.nombre, //null para que se registre de forma vacia
      apellido: this.form.value.apellido,
      dpi: this.form.value.dpi,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      fehcaActualizacion: new Date(),
    };
    this.loading = true;
    this.dataServices.actualizaUsuario(id, User).then(() => {
      this.loading = false;
      console.log('Tarjeta modificada');
      this.form.reset();
    });
    this.router.navigate(['./listUser']);
  }

  leerEditar() {
    this.titulo = 'Actualizar Usuario';
    if (this.id !== null) {
      this.dataServices.getUsuario(this.id).subscribe((data) => {
        console.log(data);
        this.form.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dpi: data.payload.data()['dpi'],
          correo: data.payload.data()['correo'],
          direccion: data.payload.data()['direccion'],
        });
      });
    }
  }

  getValidacion(validacion: string) {
    return this.form.get(validacion);
  }

  cancelar(){
    this.seleccionado.emit(false);
    this.router.navigate(['./listUser']);
    
  }
}
