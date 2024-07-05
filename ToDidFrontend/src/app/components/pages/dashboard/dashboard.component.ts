import {Component, SimpleChange, SimpleChanges} from '@angular/core';
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {FooterComponent} from "../../footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {TodoItemComponent} from "../../todo-item/todo-item.component";
import {TodoListComponent} from "../../todo-list/todo-list.component";
import {TodoListData} from "../../../interfaces/todo-list-data";
import {TodoListService} from "../../../services/todo-list.service";
import {LoadingWheelComponent} from "../../loading-wheel/loading-wheel.component";
import {TodoItemData} from "../../../interfaces/todo-item-data";
import {AuthenticationService} from "../../../services/authentication.service";
import {AlertService} from "../../../services/alert.service";
import {Router} from "@angular/router";
import {BottomGradientComponent} from "../../bottom-gradient/bottom-gradient.component";
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {SidebarService} from "../../../services/sidebar.service";
import {AnimatedSidebarButtonComponent} from "../../animated-sidebar-button/animated-sidebar-button.component";
import {ScreenSizeBreakpointService} from "../../../services/screen-size-breakpoint.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, NgForOf, TodoItemComponent, TodoListComponent, NgIf, LoadingWheelComponent, BottomGradientComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, AnimatedSidebarButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedTodoListId!: number
  selectedTodoListData?: TodoListData
  todoLists!: TodoListData[]
  isLoadComplete = false
  sidebarOpened!: boolean
  sidebarMode!: MatDrawerMode

  constructor(private todoListService: TodoListService, private authenticationService: AuthenticationService,
              public sidebarService: SidebarService, private alertService: AlertService,
              private router: Router, private screenSizeBreakpointService: ScreenSizeBreakpointService) {

    if (this.authenticationService.isLoggedOut()) {
      this.alertService.alert([{message: "Please, login to access dashboard page.", type: "warning"}])
      this.router.navigateByUrl("/login")
    }

    this.sidebarService.openedStatusChanged.subscribe((state: boolean) => {
      this.sidebarOpened = state
    })

    this.todoListService.getAllLists().subscribe(
      async data => {
        this.todoLists = data

        if (this.todoLists.length > 0) {
          this.selectedTodoListData = this.todoLists.at(0)!
          this.selectedTodoListId = this.selectedTodoListData.id
        }

        this.isLoadComplete = true
      })

    if (this.screenSizeBreakpointService.isCurrentLargerThan('sm')) {
      this.sidebarOpened = true
      this.sidebarMode = "side"
    } else {
      this.sidebarOpened = false
      this.sidebarMode = "over"
    }
  }

  selectTodoList(todoListData: TodoListData): void {
    this.selectedTodoListId = todoListData.id
    this.selectedTodoListData = todoListData
  }

  createTodoItem() {
    const newTodoItems: TodoItemData[] | null =
      this.selectedTodoListData!.todoItems.filter(todoItem => todoItem.id === -1)

    if (newTodoItems.length >= 1) {
      const todoItemForm = document.getElementById(`todoItemName-${newTodoItems.at(0)!.id}`)!
      todoItemForm.focus()
      return;
    }

    this.selectedTodoListData!.todoItems.push({
      id: -1,
      isComplete: false,
      name: "",
      todoListId: this.selectedTodoListData!.id,
    })
  }

  createTodoList() {
    const newTodoListData: TodoListData = {
      id: -1,
      name: "New TodoList",
      color: "FFFFFF",
      userId: -1,
      todoItems: []
    }

    this.selectedTodoListData = newTodoListData
    this.todoListService.create(newTodoListData).subscribe(data => {
      if (data) {
        newTodoListData.id = data.id;
      }
    })

    this.todoLists.push(newTodoListData)
  }

  deleteSelectedTodoList() {
    const deletedTodoList: TodoListData = this.todoLists.find(todoList => todoList.id == this.selectedTodoListId)!
    const deletedIndex: number = this.todoLists.findIndex(todoList => todoList.id == this.selectedTodoListId, deletedTodoList)

    this.todoLists = this.todoLists.filter(todoList => todoList.id !== this.selectedTodoListId)

    if (this.todoLists.length > 0) {
      this.selectedTodoListData = this.todoLists.at(deletedIndex == 0 ? 0 : deletedIndex - 1)!;
      this.selectedTodoListId = this.selectedTodoListData.id
    } else {
      this.selectedTodoListData = undefined
    }
  }
}
