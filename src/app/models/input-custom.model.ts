import { AbstractControl } from "@angular/forms"

export interface InputCustom {
    typeInput: "input",
    field: string,
    label?: string,
    initialValue: any,
    additionalProps: AdditionalProps
}

export interface AdditionalProps {
    validators?: any[],
    isHiddenLabel?: boolean,
    isBoldLabel?: boolean,
    typeInput?: string
    placeholder?: string
    messageErrors?: any
}

export interface IEmmitValue {
    field: string,
    control: AbstractControl,
    value: any,
    typeInput: "input"
}

export interface IFormCustom {
    valid: boolean,
    value: any
}