import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TodoListData} from "../interfaces/todo-list-data";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) {
    this.http.options("http://10.0.0.112:8000")
  }

  getAllLists() {
    return this.http.get<TodoListData[]>(`http://10.0.0.112:8000/lists`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getList(id: number) {
    return this.http.get<TodoListData>(`http://10.0.0.112:8000/lists/${id}/`)
      .pipe(
        catchError(this.handleError)
      )
  }

  create(data: TodoListData) {
    return this.http.post<TodoListData>(`http://10.0.0.112:8000/lists`, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(data: TodoListData, id: number) {
    return this.http.put<void>(`http://10.0.0.112:8000/lists/${id}`, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(id: number) {
    return this.http.delete<void>(`http://10.0.0.112:8000/lists/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('TodoList not found'))
    }

    return throwError(() => new Error(`Error ${error.status}: ${error.statusText}`));
  }
}
