import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActuaciones } from '../../../../app/shared/model/actuaciones-model';
import { IDetalleProceso, ProcesoRama } from '../../../../app/shared/model/proceso-rama-model';
import { ProcesoService } from '../../../shared/services/proceso.service';

@Component({
  selector: 'app-main-procesos-rama-judicial',
  templateUrl: './main-procesos-rama-judicial.component.html',
  styleUrls: ['./main-procesos-rama-judicial.component.scss']
})
export class MainProcesosRamaJudicialComponent implements OnInit {
  formProceso: FormGroup;
  existeUsuario: boolean;
  procesoSeleccionado: ProcesoRama;
  detalleProceso: IDetalleProceso;
  listActuaciones: IActuaciones[] =[];
  constructor(private formBuilder: FormBuilder,
    private procesoService: ProcesoService) { }

  ngOnInit() {
    this.crearFormulario();
  }

   //CREAR CAMPOS DEL FORMULARIO
   crearFormulario() {
    this.formProceso = this.formBuilder.group({
      numProceso: ["", [Validators.required, Validators.maxLength(23), Validators.minLength(23)]],
    });
  }

  //BUSCAR PROCESOS
  buscarProceso(){
    const form = this.formProceso.value;
    this.procesoService.consultarProcesoRamaJudicial(form.numProceso).subscribe(
      proceso=>{
        if(proceso.procesos.length >0){
          this.procesoSeleccionado = proceso;
          this.existeUsuario = true;
          this.procesoService.consultarProcesoRamaJudicialdetalle(this.procesoSeleccionado.procesos[0].idProceso).subscribe(
            data=>{
              this.detalleProceso = data;
            });
          //Consumir servicio de actuaciones
          this.procesoService.consultarProcesoRamaJudicialActuaciones(this.procesoSeleccionado.procesos[0].idProceso).subscribe(
            data=>{
              this.listActuaciones = data;
            })
        }
        else{
          this.existeUsuario = false;
        }
      }
    );
  }
}
