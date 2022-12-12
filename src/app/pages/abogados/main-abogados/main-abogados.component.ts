import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AbogadosService } from "../../../shared/services/abogados.service";
import { IAbogado } from "../../../shared/model/abogado-model";
import {
  IDepartamento,
  IMunicipio,
} from "../../../shared/model/localidades-model";
import { LocalidadesService } from "../../../shared/services/localidades.service";
import { AlertService } from "../../../shared/services/alert.service";
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-main-abogados",
  templateUrl: "./main-abogados.component.html",
  styleUrls: ["./main-abogados.component.scss"],
})
export class MainAbogadosComponent implements OnInit {
  formAbogado: FormGroup;
  formEditarAbogado: FormGroup;
  listAbogados: IAbogado[] = [];
  auxListAbogados: IAbogado[] = [];
  nuevoAbogado: IAbogado;
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  closeResult = "";
  estadoInput: string = "disabled";
  constructor(
    private formBuilder: FormBuilder,
    private localidadesServices: LocalidadesService,
    private alertService: AlertService,
    private abogadosServices: AbogadosService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getDepartamentos();
    this.getAbogados();
    this.crearFormulario();
  }

  refreshAbogados() {
    this.auxListAbogados = this.listAbogados
      .map((abogado, i) => ({ id: i + 1, ...abogado }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getAbogados() {
    this.abogadosServices.getAllAbogados().subscribe((respuesta) => {
      this.listAbogados = respuesta;
      this.collectionSize = this.listAbogados.length;
      this.refreshAbogados();
    });
  }
  //CREAR CAMPOS DEL FORMULARIO
  crearFormulario() {
    this.formAbogado = this.formBuilder.group({
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
      estadoCivil: ["", Validators.required],
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      tarjetaProfesional: ["", Validators.required],
      especialidad: ["", Validators.required],
      fechaNacimiento: ["", Validators.required],
      usuarioRegistro: [""],
    });
    this.formEditarAbogado = this.formBuilder.group({
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
      estadoCivil: ["", Validators.required],
      departamento: ["", Validators.required],
      municipio: ["", Validators.required],
      tarjetaProfesional: ["", Validators.required],
      especialidad: ["", Validators.required],
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
  //REGISTRAR UN ABOGADO
  registrarAbogado() {
    if (this.formAbogado.valid) {
      const formData = new FormData();
      formData.append("tipoDoc", this.formAbogado.get("tipoDocumento").value);
      formData.append("identidad", this.formAbogado.get("identidad").value);
      formData.append("nombre", this.formAbogado.get("nombre").value);
      formData.append("apellido", this.formAbogado.get("apellido").value);
      formData.append("telefono", this.formAbogado.get("telefono").value);
      formData.append("movil", this.formAbogado.get("movil").value);
      formData.append("direccion", this.formAbogado.get("direccion").value);
      formData.append("email", this.formAbogado.get("email").value);
      formData.append("genero", this.formAbogado.get("genero").value);
      formData.append("estadoCivil", this.formAbogado.get("estadoCivil").value);
      formData.append(
        "departamento",
        this.formAbogado.get("departamento").value
      );
      formData.append("municipio", this.formAbogado.get("municipio").value);
      formData.append(
        "tarjetaProfesional",
        this.formAbogado.get("tarjetaProfesional").value
      );
      formData.append(
        "especialidad",
        this.formAbogado.get("especialidad").value
      );
      formData.append(
        "fechaNacimiento",
        this.formAbogado.get("fechaNacimiento").value
      );
      formData.append("usuarioRegistro", localStorage.getItem("accesToken"));
      this.abogadosServices.createAbogado(formData).subscribe((respuesta) => {
        this.alertService.toast();
        this.getAbogados();
      });
    }
  }

  //MODALES
  verInformacion(content, abogado: IAbogado) {
    //this.respuestaEditar=false;
    this.formEditarAbogado.get("tipoDocumento").setValue(abogado.tipoDocumento);
    this.formEditarAbogado.get("identidad").setValue(abogado.identidad);
    this.formEditarAbogado.get("nombre").setValue(abogado.nombre);
    this.formEditarAbogado.get("apellido").setValue(abogado.apellido);
    this.formEditarAbogado.get("telefono").setValue(abogado.telefono);
    this.formEditarAbogado.get("movil").setValue(abogado.movil);
    this.formEditarAbogado.get("direccion").setValue(abogado.direccion);
    this.formEditarAbogado.get("email").setValue(abogado.email);
    this.formEditarAbogado.get("genero").setValue(abogado.fechaRegistro);
    this.formEditarAbogado.get("estadoCivil").setValue(abogado.estadoCivil);
    this.formEditarAbogado.get("departamento").setValue(abogado.departamento);
    this.formEditarAbogado.get("municipio").setValue(abogado.ciudad);
    this.formEditarAbogado
      .get("tarjetaProfesional")
      .setValue(abogado.tarjetaProfesional);
    this.formEditarAbogado.get("especialidad").setValue(abogado.especialidad);
    this.formEditarAbogado
      .get("fechaNacimiento")
      .setValue(abogado.fechaNacimiento);
    this.formEditarAbogado
      .get("usuarioRegistro")
      .setValue(localStorage.getItem("accesToken"));
    const formData = new FormData();

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  // formData.append("tipoDoc", abogado.tipoDocumento);
  // formData.append("identidad", abogado.identidad);
  // formData.append("nombre", abogado.nombre);
  // formData.append("apellido", abogado.apellido);
  // formData.append("telefono", abogado.telefono);
  // formData.append("movil", abogado.movil);
  // formData.append("direccion", abogado.direccion);
  // formData.append("email", abogado.email);
  // formData.append("genero", abogado.fechaRegistro);
  // formData.append("estadoCivil", abogado.estadoCivil);
  // formData.append(
  //   "departamento",
  //   abogado.departamento
  // );
  // formData.append("municipio", abogado.ciudad);
  // formData.append(
  //   "tarjetaProfesional",
  //   abogado.tarjetaProfesional
  // );
  // formData.append(
  //   "especialidad",
  //   abogado.especialidad
  // );
  // formData.append(
  //   "fechaNacimiento",
  //   abogado.fechaNacimiento
  // );
  // formData.append("usuarioRegistro", localStorage.getItem("accesToken"));
}
