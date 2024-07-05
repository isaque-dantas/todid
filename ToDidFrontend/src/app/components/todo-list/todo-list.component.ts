import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {TodoListData} from "../../interfaces/todo-list-data";
import {LoadingWheelComponent} from "../loading-wheel/loading-wheel.component";
import {TodoListService} from "../../services/todo-list.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    TodoItemComponent,
    LoadingWheelComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() data!: TodoListData
  @Output() newTodoItemCreated = new EventEmitter<void>()
  @Output() todoListDeleted = new EventEmitter<void>()
  isHovering: boolean = false
  formActivated: boolean = false
  idPrefix = 'todoListName'
  form = new FormGroup({
      name: new FormControl(''),
      color: new FormControl(''),
    })

  constructor(private service: TodoListService, private elRef: ElementRef) {
    this.form.controls['color'].disable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("data" in changes) {
      this.form.patchValue({
        name: this.data.name,
        color: `#${this.data.color}`
      })
    }
  }

  handleClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement
    const formElement = this.elRef.nativeElement.querySelector('form')

    if (!formElement.contains(clickedElement)) {
      this.finishEditing()
    }
  }

  deleteTodoItem(id: number) {
    this.data.todoItems =
      this.data.todoItems.filter(todoItem => todoItem.id !== id)
  }

  emitNewTodoItemCreation() {
    this.newTodoItemCreated.emit()
  }

  finishEditing(): void {
    console.log({todoListFormValue: this.form.value})
    if (this.form.value.name === "" || !this.formActivated)
      return;

    let formattedColor = this.form.value.color
    if (formattedColor) {
      formattedColor = formattedColor.replace('#', '')
    }

    if (this.data.name !== this.form.value.name || this.data.color !== formattedColor) {
      this.data.name = this.form.value.name!
      this.data.color = formattedColor ?? this.data.color


      this.service.update(this.data, this.data.id).subscribe()
    }

    this.switchFormState()
  }

  delete() {
    this.todoListDeleted.emit()
    if (this.data.id !== -1) {
      this.service.delete(this.data.id).subscribe()
    }
  }

  switchFormState() {
    this.formActivated = !this.formActivated;

    if (this.formActivated) {
      this.form.controls['color'].enable()
    } else {
      this.form.controls['color'].disable()
    }
  }
}
