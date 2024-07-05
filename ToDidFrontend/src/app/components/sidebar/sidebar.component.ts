import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {NgForOf, NgIf} from "@angular/common";
import {TodoListData} from "../../interfaces/todo-list-data";
import {LoadingWheelComponent} from "../loading-wheel/loading-wheel.component";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {AuthenticationService} from "../../services/authentication.service";
import {AnimatedSidebarButtonComponent} from "../animated-sidebar-button/animated-sidebar-button.component";
import {BottomGradientComponent} from "../bottom-gradient/bottom-gradient.component";
import {MatSidenav} from "@angular/material/sidenav";
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogoComponent, NgForOf, NgIf, LoadingWheelComponent, TodoListComponent, AnimatedSidebarButtonComponent, BottomGradientComponent, MatSidenav],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() todoLists!: TodoListData[]
  @Input() isLoadComplete!: boolean
  @Input() selectedTodoListData!: TodoListData | undefined;
  @Output() todoListChanged = new EventEmitter<TodoListData>()
  @Output() todoListCreationRequested = new EventEmitter<void>()
  isOpen: boolean = true

  constructor(public authenticationService: AuthenticationService, public sidebarService: SidebarService) {
  }

  selectTodoList(id: TodoListData): void {
    this.todoListChanged.emit(id)
  }

  sendRequestToCreateNewTodoList() {
    this.todoListCreationRequested.emit()
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }
}
