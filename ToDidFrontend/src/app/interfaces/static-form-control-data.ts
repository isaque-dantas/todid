import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";

export interface StaticFormControlData {
  name: string,
  type: string,
  value: string,
  placeholder: string,
  validators: ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
}
