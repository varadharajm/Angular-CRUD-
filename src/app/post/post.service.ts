import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError  } from "rxjs/operators";

import { Post } from "./post";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = "https://jsonplaceholder.typicode.com";

  httpOptions = { headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })}

  constructor( private httpClient : HttpClient) { }

  // Get all function from api
  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // Create new post
  create(post:Post):Observable<any>{
    return this.httpClient.post( this.baseUrl + '/posts/',JSON.stringify(post), this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  // Find post by Id
  find(id:number):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/posts/'+ id)
    .pipe(catchError(this.errorHandler));
  }

  // Update by id
  update(id:number, post:Post): Observable<any> {
    return this.httpClient.put(this.baseUrl + '/posts/' +id, JSON.stringify(post), this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  // Delete by id
  delete(id:number){
    return this.httpClient.delete(this.baseUrl + '/posts' + id, this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }

  // Error handling
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
