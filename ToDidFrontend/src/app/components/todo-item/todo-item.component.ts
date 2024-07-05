import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoItemData} from "../../interfaces/todo-item-data";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TodoItemService} from "../../services/todo-item.service";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() data!: TodoItemData;
  @Output() todoItemDeletionRequested = new EventEmitter<number>();
  formActivated = false
  isHovering = false
  public idPrefix = "todoItemName"

  constructor(private service: TodoItemService) {
  }

  ngOnInit(): void {
    if (this.data.id === -1) {
      this.formActivated = true
    }
  }

  changeTodoItemStatus() {
    this.data.isComplete = !this.data.isComplete
    this.service.patchIsComplete(this.data.isComplete, this.data.id).subscribe()
  }

  finishEditing(id: number): void {
    const inputElement: HTMLInputElement = document.querySelector(`#${this.idPrefix}-${id}`)!

    if (inputElement.value === "")
      return;

    if (this.data.name !== inputElement.value) {
      this.data.name = inputElement.value

      if (this.data.id === -1) {
        this.service.create(this.data).subscribe(data => {
          if (data) {
            this.data.id = data.id;
          }
        })
      } else {
        this.service.update(this.data, id).subscribe()
      }
    }

    this.formActivated = false
  }

  delete() {
    this.todoItemDeletionRequested.emit(this.data.id)
    if (this.data.id !== -1)
      this.service.delete(this.data.id).subscribe()
  }
}
