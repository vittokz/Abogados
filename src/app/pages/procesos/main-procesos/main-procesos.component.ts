import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoService } from '../../../shared/services/contrato.service';
import { IProceso } from '../../../shared/model/proceso-model';
import { ProcesoService } from '../../../shared/services/proceso.service';
import { IContratoCompleto } from '../../../shared/model/contrato-model';
import { AbogadosService } from '../../../shared/services/abogados.service';
import { IAbogado } from '../../../shared/model/abogado-model';

@Component({
  selector: 'app-main-procesos',
  templateUrl: './main-procesos.component.html',
  styleUrls: ['./main-procesos.component.scss']
})
export class MainProcesosComponent implements OnInit {
  formProceso: FormGroup;
  procesoEncontrado: IProceso;
  //variables para cliente
  isActivoProcesos: boolean;
  existeUsuario: boolean = false;
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
   listContratosEncontrados: IContratoCompleto[];
   abogadoEncontrado: IAbogado;
  constructor(private formBuilder: FormBuilder,
    private abogadosServices: AbogadosService,
    private procesoService: ProcesoService,private contratosService: ContratoService,) { }

  ngOnInit() {
    this.crearFormulario();
  }

   //CREAR CAMPOS DEL FORMULARIO
   crearFormulario() {
    this.formProceso = this.formBuilder.group({
      numProceso: ["", Validators.required],
    });
  }

  //BUSCAR PROCESOS
  buscarProceso(){
    const form = this.formProceso.value;
    this.procesoService.getProcesoByNumProceso(form.numProceso).subscribe(
      proceso=>{
        this.procesoEncontrado = proceso;
        this.identidad = this.procesoEncontrado[0].identidadCliente;
        this.buscarCliente(this.identidad);
        this.buscarAbogadoDefensor(this.procesoEncontrado[0].identidadAbogado);   
      }
    );
  }

  //BUSCAR ABOGADO DEFENSOR
  buscarAbogadoDefensor(identidadAbogado){
    this.abogadosServices.getAbogadoByIdentidad(identidadAbogado).subscribe(
      abogado=>{
        this.abogadoEncontrado = abogado;
      });
  }

   //BUSCAR CLIENTE
   buscarCliente(identidadCliente){
    this.contratosService.getContratosByIdentidad(identidadCliente).subscribe(
      contrato=>{
        this.existeUsuario=true;
        this.listContratosEncontrados = contrato;
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

}
