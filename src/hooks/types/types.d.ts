import {
  HTMLAttributes,
  HTMLInputElement,
  CSSProperties,
  RefObject,
} from "react";

declare global {
  export type FieldProps<T> = {
    name: keyof T;
  } & HTMLAttributes<HTMLInputElement>;

  export type FormProps<T> = {
    onSubmit: (data: ReformData<T>) => void;
    style?: CSSProperties;
  };

  export type FieldGroupItemProps<U> = FieldProps<U>;

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
    ref?: RefObject<HTMLInputElement> | undefined;
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
