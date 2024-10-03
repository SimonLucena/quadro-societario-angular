import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "./api-url";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private Url:string = apiUrl+"/empresa";

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(this.Url);
  }

  getEmpresaById(codigoid: string): Observable<any> {
    return this.http.get<any>(`${this.Url}/${codigoid}`);
  }

  criarEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(this.Url, empresa);
  }

  atualizarEmpresa(id: string, empresa: any): Observable<any> {
    return this.http.put<any>(`${this.Url}/${id}`, empresa);
  }

  deletarEmpresa(id: string): Observable<any> {
    return this.http.delete<any>(`${this.Url}/${id}`);
  }
}
