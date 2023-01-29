import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IJuzgado } from '../model/juzgado-model';

@Injectable({
  providedIn: 'root'
})
export class JuzgadoService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

//Crear un juzgado
 createJuzgado(juzgado): Observable<any> {
    return this.http.post<any>(this.apiUrl + "juzgados/addJuzgado.php", juzgado);
  }
  //Update un juzgado
 updateJuzgado(juzgado): Observable<any> {
  return this.http.post<any>(this.apiUrl + "juzgados/updateJuzgado.php", juzgado);
}

  //RECUPERAR TODOS LOS JUZGADOS
  getAllJuzgados(): Observable<IJuzgado[]> {
    return this.http.get<IJuzgado[]>(this.apiUrl + "juzgados/getAllJuzgados.php");
  }

}
