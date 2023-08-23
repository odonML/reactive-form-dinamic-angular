import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmmitValue, IFormCustom, InputCustom } from './models/input-custom.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'forms-groups';

  form: IFormCustom = {
    valid: false,
    value: {}
  };
  
  formGroup: FormGroup;
  initInputsCustom: InputCustom[]= []
  controls: IEmmitValue[] = [];
  saveDisable: boolean = false;

  constructor(
    private fb: FormBuilder
    ) {
      this.formGroup = this.fb.group({
        nombre: ["", Validators.required],
        apellido: [""]
      })
     }
    
     ngOnInit(): void {
      this.initInputsCustom = [{
        typeInput: "input",
        field: "Nombre",
        label: "Nombre:",
        initialValue: "",
        additionalProps:{
          validators: [Validators.required],
          messageErrors: {
            required: "El nombre es obligatorio"
          }
        }
      },
      {
        typeInput: "input",
        field: "Apellido",
        label: "Apellido:",
        initialValue: "",
        additionalProps:{
          
        }
      }]
    }



  onInput($event: IEmmitValue) {
    let indexCurrentControl = this.controls.findIndex((control) => control.field === $event.field);

    if (indexCurrentControl === -1) {
      this.controls.push($event);
    } else {
      this.controls[indexCurrentControl] = $event;
    }

    this.form = this.transformToForm(this.controls)

    this.validForm();
  }

  validForm() {
    this.saveDisable = !this.form.valid;
  }

  transformToForm(controls: IEmmitValue[]): IFormCustom {

    const currentControls = controls
    const valid = currentControls.every((control) => control.control!.valid || control.control!.disabled);
    let value: any = {};

    currentControls.forEach((control) => {
      value[control.field] = control.control!.value;
    });


    return {
      valid,
      value
    }
  }

  getFormForPost(){
    console.log(this.form)
  }
}
