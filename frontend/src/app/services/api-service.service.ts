import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:3000';
  private tasks:any[] = []
  public tasksubject = new BehaviorSubject<any[]>([])
  constructor(private http:HttpClient) { }


  getTasks(){
    return this.http.get(`${this.baseUrl}/task/gettasks`).subscribe({
      next:(response:any) => {
        const obj = Object.values(response);
        if(response && response.success){
          this.tasksubject.next([...response.tasks])
        }
      },
      error:error => {
        console.log(error);
      }
    })
  }
  edittask(task:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/task/edittask`,task)
  }
  savetask(task:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/task/savetask`,task)
  }
  delete(task:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/task/deletetask`,task)
  }
  login(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/login`,data)
  }
  register(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/register`,data)
  }
}
