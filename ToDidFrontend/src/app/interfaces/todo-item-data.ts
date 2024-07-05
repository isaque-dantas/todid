import {TodoEntityData} from "./todo-entity-data";

export interface TodoItemData extends TodoEntityData {
  isComplete: boolean
  todoListId: number
}
