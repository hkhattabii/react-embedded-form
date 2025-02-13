import React, { HTMLAttributes, RefObject} from "react";

declare global {


  export type FormProps<T> = {
    onSubmit: (data: ReformData<T>) => void;
    style?: React.CSSProperties;
  };

  
  export type InputProps<T> = {
    name: keyof T;
    field?: ReformField<T, keyof T>
  } & HTMLAttributes<HTMLInputElement>
  
  export type InputGroupProps<U> = InputProps<U>

  export type SelectProps<T> = {
    name: keyof T
    items: Array<string | number>
    field?: ReformField<T>
  } & HTMLAttributes<HTMLSelectElement>

  export type SelectGroupProps<U> = SelectProps<U>



  export type Reform<T> = {
    [K in keyof T]: T[K];
  };

  export type ReformFields<T> = {
    [K in keyof T]: ReformField<T, keyof T>;
  };

  export type ReformField<T, K extends keyof T> = {
    name: K;
    type: ReformFieldType;
    value?: any | undefined;
    ref?: RefObject<any> | undefined;
    children?: ReformFields<T> | undefined;
  };

  export type ReformFieldType = "text" | "number" | "any";

  export type ReformDataWithParent<T> = {
    [K in keyof T]: ReformData<T>;
  };
  export type ReformData<T> = {
    [K in keyof T]: any;
  };
}
