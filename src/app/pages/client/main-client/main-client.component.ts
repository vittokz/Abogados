import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartamento, IMunicipio } from '../../../shared/model/localidades-model';
import { LocalidadesService } from '../../../shared/services/localidades.service';


@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.scss']
})
export class MainClientComponent implements OnInit {
   tipoPersonaSeleccionada: string ='';
   formClient: FormGroup;
   listDepartamentos: IDepartamento[];
   listMunicipios: IMunicipio[];
   constructor(private formBuilder: FormBuilder,
    private localidadesServices: LocalidadesService,) {}

  ngOnInit() {
    this.getDepartamentos();
    this.crearFormulario();
  }
  //CREAR CAMPOS DEL FORMULARIO
  crearFormulario() {
    this.formClient = this.formBuilder.group({
      tipoDocumento: ["", Validators.required],
      identidad: ["", Validators.required],
      tipoPersona: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      telefono: ["", Validators.required],
      movil: ["", Validators.required],
      direccion: ["", Validators.required],
      email: ["", Validators.required],
      genero: ["", Validators.required],
      estadoCivil:["", Validators.required],
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      especialidad: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
    });
  }

  //RECUPERAR TODOS LOS DEPARTAMENTOS
  getDepartamentos() {
    this.localidadesServices.getAllDepartamentos().subscribe((data) => {
      this.listDepartamentos = data;
    });
  }
  //SELECCIONAR MUNICPIO SEGUN DEPARTAMENTO SELECCIONADO
  selecDepartamento(eventDepartamento) {
    this.localidadesServices
      .getAllMunicipios(eventDepartamento.target.value)
      .subscribe((data) => {
        this.listMunicipios = data;
      });
  }

  //REGISTRAR UN USUARIO-CLIENTE
  registrarClient(){
    console.log(this.formClient.value);
  }
  selectTipoPersona(event){
    this.tipoPersonaSeleccionada = event.target.value;
  }

}
