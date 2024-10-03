import { Injectable } from '@angular/core';
import {apiUrl} from "./api-url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private Url:string = apiUrl+"/socio";

  constructor(private http: HttpClient) {}

  getSociosByEmpresa(codigoid_empresa: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.Url}/empresa/${codigoid_empresa}`);
  }

  criarSocio(socio: any): Observable<any> {
    return this.http.post<any>(this.Url, socio);
  }

  atualizarSocio(id: string, socio: any): Observable<any> {
    return this.http.put<any>(`${this.Url}/${id}`, socio);
  }

  deletarSocio(id: string): Observable<any> {
    return this.http.delete<any>(`${this.Url}/${id}`);
  }
}
