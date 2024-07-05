import {StaticFormControlData} from "./static-form-control-data";
import {AlertData} from "./alert-data";

export interface StaticFormData {
  title: string,
  subtitle: string,
  formControls: StaticFormControlData[]
  serviceMethod: Function,
  responseHandler?: Function,
  successAlerts?: AlertData[],
  errorAlerts?: { [statusCode:number]: AlertData[] }
  next: string
}
