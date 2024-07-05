import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public openedStatusChanged = new EventEmitter<boolean>()
  private _isOpen!: boolean

  get isOpen() {
    return this._isOpen;
  }

  constructor() { }

  open() {
    this._isOpen = true;
    this.openedStatusChanged.emit(this._isOpen);
  }

  close() {
    this._isOpen = false;
    this.openedStatusChanged.emit(this._isOpen);
  }
}
