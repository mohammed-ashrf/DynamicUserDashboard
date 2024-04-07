import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcesshttpService } from './processhttp.service';
import { Observable, catchError } from 'rxjs';
import { User, page, UserData } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcesshttpService) { }

  getUsers(page: number): Observable<page> {
    let url = `https://reqres.in/api/users?page=${page}`;
    return this.http.get<page>(`${this.apiUrl}?page=${page}`)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getUserById(id: number): Observable<UserData> {
    let url = `https://reqres.in/api/users/${id}`;
    return this.http.get<UserData>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
