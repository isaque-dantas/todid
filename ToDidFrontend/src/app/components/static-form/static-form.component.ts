import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {StaticFormData} from "../../interfaces/static-form-data";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoadingWheelComponent} from "../loading-wheel/loading-wheel.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AlertService} from "../../services/alert.service";
import {AlertData} from "../../interfaces/alert-data";

@Component({
  selector: 'app-static-form',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    LoadingWheelComponent
  ],
  templateUrl: './static-form.component.html',
  styleUrl: './static-form.component.css'
})
export class StaticFormComponent {
  @Input() data!: StaticFormData
  form = new FormGroup({})
  responseOk = false
  formControlsIndexes = new Array<number>()
  protected readonly Object = Object

  constructor(private router: Router, private alertService: AlertService) {
  }

  ngOnInit() {
    this.data.formControls.forEach(formControlData => {
      this.form.addControl(formControlData.name, new FormControl(formControlData.value, formControlData.validators))
    })
    this.formControlsIndexes = Array.from({length: this.data.formControls.length}, (_, index) => index + 1)
  }

  submit() {
    if (this.form.valid) {
      this.data.serviceMethod(this.form.value).subscribe({
          next: (response: HttpResponse<unknown>) => {
            this.responseOk = true
            this.alertService.alert(
              this.data.successAlerts ?? [{message: "Data sent successfully", type: "success"}]
            )

            if (this.data.responseHandler)
              this.data.responseHandler(response)

            this.router.navigateByUrl(this.data.next)
          },
          error: (response: HttpErrorResponse) => {
            this.responseOk = false

            if (this.data.errorAlerts) {
              this.alertService.alert(this.data.errorAlerts[response.status])
              return;
            }

            const alerts = this.getErrorAlerts(response)
            if (alerts)
              this.alertService.alert(alerts)
          }
        }
      )
    }
  }

  getErrorAlerts(response: HttpErrorResponse): AlertData[] {
    const errorsPerProperty: { [propertyName: string]: Array<string> } = response.error.errors
    let alerts = new Array<AlertData>()

    Object.values(errorsPerProperty).forEach(errorsList => {
      errorsList.forEach(error => {
        alerts.push({message: error, type: "error"})
      })
    })

    return alerts
  }

  getErrors(controlName: string): string[] {
    const control = this.form.get(controlName)
    let errors: string[] = []

    const keyToMessage: { [key: string]: Function } = {
      email: () => "Not an email address",
      required: () => "This field is required",
      minlength: (lengthData: { requiredLength: string, actualLength: string }) =>
        `Should have at least ${lengthData.requiredLength} characters, but it has ${lengthData.actualLength} characters`,
      maxlength: (lengthData: { requiredLength: string, actualLength: string }) =>
        `Should have more than ${lengthData.requiredLength} characters, but it has ${lengthData.actualLength} characters`,
    }

    if (control && control.errors) {
      errors = Object.keys(control.errors).map(keyError => {
        if (keyError in keyToMessage && !keyError.includes("length")) {
          return keyToMessage[keyError]()
        } else if (keyError.includes("length")) {
          return keyToMessage[keyError](control.errors![keyError])
        } else {
          return `${keyError}: ${control.errors![keyError]}`
        }
      })
    }

    return errors;
  }
}
