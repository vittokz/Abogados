import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartamento, IMunicipio } from '../../../shared/model/localidades-model';
import { LocalidadesService } from '../../../shared/services/localidades.service';
import { UsuariosClientesService } from '../../../shared/services/usuarios-clientes.service';
import { ContratoService } from '../../../shared/services/contrato.service';
import { IContratoCompleto } from '../../../shared/model/contrato-model';
import { environment } from '../../../../environments/environment';
import { ProcesoService } from '../../../shared/services/proceso.service';
import { AlertService } from '../../../shared/services/alert.service';
import { JuzgadoService } from '../../../shared/services/juzgado.service';
import { IJuzgado } from '../../../shared/model/juzgado-model';
@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.scss']
})
export class MainClientComponent implements OnInit {
   formClient: FormGroup;
   formProceso: FormGroup;
   nombre: string ="";
   identidad:string="";
   identidadAbogado: string="";
   telefono:string="";
   movil:string="";
   email:string="";
   direccion:string="";
   contrato:string="";
   idContrato:string="";
   usuarioRegistro:string="";
   especialidad:string="";
   fechaNacimiento:string="";
   tipoPersona:string="";
   listDepartamentos: IDepartamento[];
   listMunicipios: IMunicipio[];
   listJuzgados: IJuzgado[];
   listContratosEncontrados: IContratoCompleto[];
   apiUrl: string = environment.apiUrl;
   isActivoProcesos: boolean;
   existeUsuario: boolean = false;
   constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private juzgadoService: JuzgadoService,
    private procesoService: ProcesoService,
    private contratosService: ContratoService,
    private localidadesServices: LocalidadesService,) {}

  ngOnInit() {
    this.crearFormulario();
    this.listAllJuzgados();
    this.getDepartamentos();
  }
  //CREAR CAMPOS DEL FORMULARIO
  crearFormulario() {
    this.formClient = this.formBuilder.group({
      identidad: ["", Validators.required],
    });
    this.formProceso = this.formBuilder.group({
      numProceso: ["", Validators.required],
      tipoProceso: ["", Validators.required],
      demandado: ["", Validators.required],
      juzgado: ["", Validators.required],
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
    });
  }

  //RECUPERAR TODOS LOS JUZGADOS
    listAllJuzgados() {
      this.juzgadoService.getAllJuzgados().subscribe((juzgados) => {
        this.listJuzgados = juzgados;
      });
    }

  //BUSCAR CLIENTE
  buscarCliente(){
    const form = this.formClient.value;
    this.contratosService.getContratosByIdentidad(form.identidad).subscribe(
      contrato=>{
        this.existeUsuario=true;
        this.listContratosEncontrados = contrato;
        this.identidad = this.listContratosEncontrados[0].identidad;
        this.telefono = this.listContratosEncontrados[0].telefono;
        this.movil = this.listContratosEncontrados[0].movil;
        this.email = this.listContratosEncontrados[0].email;
        this.direccion = this.listContratosEncontrados[0].direccion;
        this.contrato = this.listContratosEncontrados[0].nombreArchivo;
        this.usuarioRegistro = this.listContratosEncontrados[0].usuarioRegistro;
        this.especialidad = this.listContratosEncontrados[0].especialidad;
        this.fechaNacimiento = this.listContratosEncontrados[0].fechaNacimiento;
        this.tipoPersona = this.listContratosEncontrados[0].tipoPersona;
        this.nombre = this.listContratosEncontrados[0].nombre + " " + this.listContratosEncontrados[0].apellido;
      }
    );
  }

  //Activar flujo de procesos
  activarProceso(contrato){
    this.isActivoProcesos = true;
    this.idContrato = contrato.id;
    this.identidadAbogado = contrato.identidadAbogado;
  }

  //REGISTRAR PROCESO
  registrarProceso(){
    const formData = new FormData();
    formData.append('identidadCliente', this.identidad);
    formData.append('identidadAbogado', this.identidadAbogado);
    formData.append('idContrato', this.idContrato);
    formData.append('numProceso', this.formProceso.get("numProceso").value);
    formData.append('tipoProceso',this.formProceso.get('tipoProceso').value);
    formData.append('demandado', this.formProceso.get('demandado').value);
    formData.append('juzgado', this.formProceso.get('juzgado').value);
    formData.append('departamento', this.formProceso.get('departamento').value);
    formData.append('municipio', this.formProceso.get('municipio').value);
    formData.append('usuarioRegistro', localStorage.getItem("accesToken"));
    this.procesoService.createProceso(formData).subscribe(
      respuesta=>{
        if(respuesta["resul"]===1){
          this.alertService.toast();
          this.formProceso.reset();
        }
      }
    );
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

  
}
