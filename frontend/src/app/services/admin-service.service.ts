import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  getCliente(id: string) {
    return this.http.get(`http://127.0.0.1:8000/api/admin/${id}`);
  }

  setLogin(admin: object){
    return this.http.post(`http://127.0.0.1:8000/api/admin`, admin);
  }

  setUpdate(inputdata: object, adminID: number) {
    return this.http.put(`http://127.0.0.1:8000/api/admin/${adminID}`, inputdata);
  }
}
