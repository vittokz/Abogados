import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IActuaciones } from "../model/actuaciones-model";
import { IProceso } from "../model/proceso-model";
import { IDetalleProceso, ProcesoRama } from "../model/proceso-rama-model";

@Injectable({
  providedIn: "root",
})
export class ProcesoService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Crear un proceso
  createProceso(proceso): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + "procesos/addProceso.php",
      proceso
    );
  }

  //RECUPERAR TODOS LOS PROCESOS
  getAllProcesos(): Observable<IProceso[]> {
    return this.http.get<IProceso[]>(
      this.apiUrl + "procesos/getAllProcesos.php"
    );
  }

   //RECUPERAR CONTRATO POR IDENTIDAD
   getProcesoByNumProceso(numProceso:string): Observable<IProceso> {
    return this.http.get<IProceso>(this.apiUrl + "procesos/getProcesoByNumProceso.php?numProceso="+numProceso);
  }

  consultarProcesoRamaJudicial(numProceso: string): Observable<ProcesoRama> {
    return this.http.get<ProcesoRama>(
      "https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero="+numProceso+"&SoloActivos=false&pagina=1");
  }

  consultarProcesoRamaJudicialdetalle(idProceso): Observable<IDetalleProceso> {
    return this.http.get<IDetalleProceso>(
      "https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Detalle/"+idProceso+"");
  }

  consultarProcesoRamaJudicialDocumentos(idProceso): Observable<IDetalleProceso> {
    return this.http.get<IDetalleProceso>(
      "https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Documentos/"+idProceso+"");
  }
  consultarProcesoRamaJudicialActuaciones(idProceso): Observable<IActuaciones[]> {
    return this.http.get<IActuaciones[]>(
      "https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/"+idProceso+"?pagina=1");
  }
}
