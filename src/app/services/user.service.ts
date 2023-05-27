import { Injectable } from '@angular/core';
import { HttpService } from 'server/http.common';

// My Models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly path ="users";
  constructor(private http: HttpService) { }

  getAllPersons() {
    return this.http.getAll(`${this.path}/all`);
  }

  getPersonById(id: number) {
    return this.http.get(this.path, id);
  }

  postPerson(body: any) {
    return this.http.post(this.path, body);
  }

  putPerson(id: number, body: User) {
    return this.http.put(this.path, id, body);
  }

  deletePerson(id: number) {
    return this.http.delete(this.path, id);
  }

}
