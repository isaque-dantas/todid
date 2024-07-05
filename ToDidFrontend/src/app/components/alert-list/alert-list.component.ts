import {Component} from '@angular/core';
import {LoadingWheelComponent} from "../loading-wheel/loading-wheel.component";
import {NgForOf, NgIf} from "@angular/common";
import {AlertData} from "../../interfaces/alert-data";
import {AlertService} from "../../services/alert.service";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [
    LoadingWheelComponent,
    NgForOf,
    NgIf,
    AlertComponent
  ],
  templateUrl: './alert-list.component.html',
  styleUrl: './alert-list.component.css'
})
export class AlertListComponent {
  alertDataList?: { data: AlertData, index: number }[]
  protected readonly Object = Object;

  constructor(private service: AlertService) {
  }

  ngOnInit() {
    this.service.alertEmitter.subscribe(
      (emittedData) => {
        this.alertDataList = this.getIndexArray(emittedData)
      }
    )
  }

  getIndexArray (array: Array<any>) {
    return array.map((data, index) => ({data, index}))
  }

  dismissAlert(index: number) {
    this.alertDataList = this.alertDataList?.filter(alertData => alertData.index !== index)
  }
}
