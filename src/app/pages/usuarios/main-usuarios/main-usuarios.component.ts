import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { IDepartamento, IMunicipio } from '../../../shared/model/localidades-model';
import { IUsuario } from '../../../shared/model/usuario-model';
import { LocalidadesService } from '../../../shared/services/localidades.service';
import { UsuariosClientesService } from '../../../shared/services/usuarios-clientes.service';

@Component({
  selector: 'app-main-usuarios',
  templateUrl: './main-usuarios.component.html',
  styleUrls: ['./main-usuarios.component.scss']
})
export class MainUsuariosComponent implements OnInit {

  formUsuario: FormGroup;
  listUsuarios: IUsuario[]=[];
  auxListUsuarios: IUsuario[]=[];
  nuevoAbogado: IUsuario;
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private formBuilder: FormBuilder,
    private localidadesServices: LocalidadesService,
    private alertService: AlertService,
    private usuariosClienteServices: UsuariosClientesService) {}

  ngOnInit() {
    this.getDepartamentos();
    this.getUsuarios();
    this.crearFormulario();
  }

  refreshUsuarios() {
    this.auxListUsuarios = this.listUsuarios.map((abogado, i) => ({ id: i + 1, ...abogado })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
	}

  getUsuarios() {
    this.usuariosClienteServices.getAllUsuarios().subscribe(
      respuesta=>{
        this.listUsuarios= respuesta;
        this.collectionSize = this.listUsuarios.length;
        this.refreshUsuarios();
      }
    );
  }
  //CREAR CAMPOS DEL FORMULARIO
  crearFormulario() {
    this.formUsuario = this.formBuilder.group({
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
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      usuarioRegistro: [""],
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

  //REGISTRAR UN USUARIO
  registrarUsuario(){
    if(this.formUsuario.valid){
      const formData = new FormData();
      formData.append("tipoDoc", this.formUsuario.get("tipoDocumento").value);
      formData.append("identidad", this.formUsuario.get("identidad").value);
      formData.append("nombre", this.formUsuario.get("nombre").value);
      formData.append("apellido", this.formUsuario.get("apellido").value);
      formData.append("telefono", this.formUsuario.get("telefono").value);
      formData.append("movil", this.formUsuario.get("movil").value);
      formData.append("direccion", this.formUsuario.get("direccion").value);
      formData.append("email", this.formUsuario.get("email").value);
      formData.append("genero", this.formUsuario.get("genero").value);
      formData.append("departamento", this.formUsuario.get("departamento").value);
      formData.append("municipio", this.formUsuario.get("municipio").value);
      formData.append("fechaNacimiento", this.formUsuario.get("fechaNacimiento").value);
      formData.append("usuarioRegistro",localStorage.getItem('accesToken'));
      this.usuariosClienteServices.createUsuario(formData).subscribe(
        respuesta=>{
          this.alertService.toast();
          this.getUsuarios();
        }
      );
    }
    
  }
  
}
