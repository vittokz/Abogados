import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAbogado } from '../model/abogado-model';

@Injectable({
  providedIn: 'root'
})
export class AbogadosService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

//Crear un abogado
  createAbogado(abogado): Observable<any> {
    return this.http.post<any>(this.apiUrl + "abogados/addAbogado.php", abogado);
  }

  //RECUPERAR TODOS LOS ABOGADOS
  getAllAbogados(): Observable<IAbogado[]> {
    return this.http.get<IAbogado[]>(this.apiUrl + "abogados/getAllAbogados.php");
  }
}
