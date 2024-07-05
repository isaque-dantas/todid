import {TodoListData} from "./todo-list-data";

export interface UserData {
  name: string,
  username: string,
  email: string,
  password?: string,
  todoLists?: TodoListData[]
}
