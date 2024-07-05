import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {TodoItemData} from "../interfaces/todo-item-data";

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  constructor(private http: HttpClient) {
    this.http.options("http://10.0.0.112:8000")
  }

  patchIsComplete(isComplete: boolean, id: number) {
    return this.http.patch<void>(`http://10.0.0.112:8000/items/${id}`, {isComplete: isComplete})
  }

  update(data: TodoItemData, id: number) {
    return this.http.put<void>(`http://10.0.0.112:8000/items/${id}`, data)
  }

  create(data: TodoItemData) {
    return this.http.post<TodoItemData>(`http://10.0.0.112:8000/items`, data)
  }

  delete(id: number) {
    return this.http.delete<void>(`http://10.0.0.112:8000/items/${id}`)
  }
}
