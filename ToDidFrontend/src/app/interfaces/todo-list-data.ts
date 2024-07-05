import {TodoItemData} from "./todo-item-data";
import {TodoEntityData} from "./todo-entity-data";

export interface TodoListData extends TodoEntityData {
  color: string,
  userId: number,
  todoItems: TodoItemData[]
}
