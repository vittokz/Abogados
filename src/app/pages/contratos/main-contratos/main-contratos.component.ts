import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbogadosService } from '../../../shared/services/abogados.service';
import { IUsuario } from '../../../shared/model/usuario-model';
import { UsuariosClientesService } from '../../../shared/services/usuarios-clientes.service';
import { IAbogado } from '../../../shared/model/abogado-model';
import { ContratoService } from '../../../shared/services/contrato.service';
import { AlertService } from '../../../shared/services/alert.service';
import { IContrato } from '../../../shared/model/contrato-model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-main-contratos',
  templateUrl: './main-contratos.component.html',
  styleUrls: ['./main-contratos.component.scss']
})
export class MainContratosComponent implements OnInit {
  formContrato: FormGroup;
  clienteEncontrado: IUsuario;
  abogadoEncontrado: IAbogado;
  listContratos: IContrato[];
  listAuxContratos: IContrato[];
  apiUrl: string = environment.apiUrl;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(private fb: FormBuilder,
    private usuarioClienteService: UsuariosClientesService,
    private abogadosService: AbogadosService,
    private contratosService: ContratoService,
    private alertService: AlertService,) { }

  ngOnInit() {
    this.crearFormulario();
    this.getAllContratos();
  }
  getAllContratos() {
    this.contratosService.getAllContratos().subscribe((contratos) => {
       this.listContratos = contratos;
       this.collectionSize = this.listContratos.length;
       this.refreshContratos();
    });
  }

  refreshContratos() {
    this.listAuxContratos = this.listContratos
      .map((contrato, i) => ({ id: i + 1, ...contrato }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

    //Crear campos del forlumario
    crearFormulario() {
      this.formContrato = this.fb.group({  
        identidad: ["", Validators.required],
        nombreCliente: [],
        identidadAbogado: ["", Validators.required],
        nombreAbogado:[],
        nombreContrato: ["", Validators.required],
        fileContrato: ['', Validators.required],
      });
    }

    //Buscar cliente
    buscarCliente(event){
      this.usuarioClienteService.getUsuarioByIdentidad(event.target.value).subscribe(
        data=>{
          if(data[0] != "No existe"){
            this.clienteEncontrado= data;
            this.formContrato.get("nombreCliente").setValue(data.nombre+ " " + data.apellido);
          }else{
            this.formContrato.get("nombreCliente").setValue("Usuario no existe");
          }
        }
      );
    }

    //Buscar Abogado
    buscarAbogado(event){
      this.abogadosService.getAbogadoByIdentidad(event.target.value).subscribe(
        data=>{
          if(data[0] != "No existe"){
            this.abogadoEncontrado= data;
            this.formContrato.get("nombreAbogado").setValue(data.nombre+ " " + data.apellido);
          }else{
            this.formContrato.get("nombreAbogado").setValue("Abogado no existe");
          }
        }
      );
    }

    onFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.formContrato.get('fileContrato').setValue(file);
      }
    }

    //REGISTRAR CONTRATO
    registrarContrato(){
      const formData = new FormData();
      formData.append('identidad', this.formContrato.get("identidad").value);
      formData.append('nombreCliente',this.formContrato.get('nombreCliente').value);
      formData.append('identidadAbogado', this.formContrato.get('identidadAbogado').value);
      formData.append('nombreAbogado', this.formContrato.get('nombreAbogado').value);
      formData.append('nombreContrato', this.formContrato.get('nombreContrato').value);
      formData.append('fileContrato', this.formContrato.get('fileContrato').value);
      formData.append('usuarioRegistro', localStorage.getItem("accesToken"));
      this.contratosService.createContrato(formData).subscribe(
        data=>{
          if(data[0]==="ok")
          {
            this.alertService.toast();
            this.getAllContratos();
          }
        }
      );
    }
  

}
