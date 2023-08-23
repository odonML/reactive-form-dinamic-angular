import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { IEmmitValue, InputCustom } from 'src/app/models/input-custom.model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() input?: InputCustom;

  @Output()
  valueChanges = new EventEmitter<IEmmitValue>();
  
  form!: FormGroup;
  messageError!: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      [this.input!.field]: [this.input!.initialValue, this.input!.additionalProps?.validators]
    });

    const control = this.form.get(this.input!.field);
    control?.valueChanges.pipe(
      startWith(control.value),
      debounceTime(250)
    ).subscribe((value: any) => {
      this.emitValue(value)
    })
  }

  emitValue(value: any) {
    this.valueChanges.emit({
      field: this.input!.field,
      control: this.form.get(this.input!.field)!,
      value: value,
      typeInput: this.input!.typeInput
    });

  }

  getIsInvalid(form: FormGroup, field: string) {
    // TODO esto lo puedes sacar a una UTILS
    return form.get(field)!.errors && form.get(field)!.touched;
  }


  isInvalid(field: string) {
    const isInvalid = this.getIsInvalid(this.form, field)

    if (this.input!.additionalProps.messageErrors !== undefined && isInvalid) {
      const formErrors = this.form.get(field)?.errors;
      const errors = Object.keys(formErrors!)

      errors.forEach((key: string) => {
        this.messageError = this.input!.additionalProps.messageErrors[key]
      })

    }
    return isInvalid;
  }


}
