import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, Prizenor, User } from '../Models/Prisoner';
import { HttpPaths } from '../Enums/http-paths';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //////////////// Registeration Process

  RegisterUser(model: User) {
    return this.http.post(`${HttpPaths.API_USER_REGISTER}`, model, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  LoginUser(model: LoginData) {
    return this.http.post(`${HttpPaths.API_USER_LOGIN}`, model, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  LogOut() {
    return this.http.get(`${HttpPaths.API_USER_LOGOUT}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }


  ///////////////////////////

  AddPrizoner(model: FormData) {
    return this.http.post(HttpPaths.API_ADD_PRIZENORES, model, {
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  UpdatePrizoner(model: FormData) {
    return this.http.put(HttpPaths.API_Update_PRIZENORES, model, {
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  UpdatePlace(id: number, place: string) {
    return this.http.put(HttpPaths.API_UPDATE_PLACE_PRIZENORES + `place=${place}&id=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  DeletePrizoner(id: number) {
    return this.http.get(`${HttpPaths.API_DELETE_PRIZENORES}${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  GetAllPrizoners() {
    return this.http.get(HttpPaths.API_GET_PRIZENORES, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  GetAllDeletedPrizoners() {
    return this.http.get(HttpPaths.API_GET_DELETED_PRIZENORES, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  GetAllOutSourcePrizoners() {
    return this.http.get(HttpPaths.API_GET_OUTSOURCE_PRIZENORES, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }


  GetPrizonersById(id: number) {
    return this.http.get(HttpPaths.API_GET_PRIZENORES_BY_ID + id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }
}
