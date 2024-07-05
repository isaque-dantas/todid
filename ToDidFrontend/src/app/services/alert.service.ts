import {EventEmitter, Injectable} from '@angular/core';
import {AlertData} from "../interfaces/alert-data";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertEmitter = new EventEmitter<AlertData[]>();

  constructor() { }

  alert(alertData: AlertData[]) {
    this.alertEmitter.emit(alertData)
  }
}
