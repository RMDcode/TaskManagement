import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // POST request
  postTask(data: any) {
    return this._http.post<any>("http://localhost:4000/Task/TaskAdded", data).pipe(map((res: any) => {
      return res;
    }));
  }

  // GET request
  getTask() {
    return this._http.get<any>("http://localhost:4000/Task/Tasks").pipe(map((res: any) => {
      return res;
    }));
  }

  // DELETE request
  deleteTask(id: any) {
    return this._http.delete<any>(`http://localhost:4000/Task/TaskAdded/${id}`).pipe(map((res: any) => {
      return res;
    }));
  }
  
  // UPDATE request
  updateTask(id: any, data: any) {
    return this._http.put<any>(`http://localhost:4000/Task/TaskAdded/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }
}
