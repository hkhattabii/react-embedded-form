import {HTMLAttributes, HTMLInputElement, CSSProperties, RefObject} from 'react'

export type FieldProps<T> = {
  name: keyof T;
} & HTMLAttributes<HTMLInputElement>;

export type FormProps<T> = {
  onSubmit: (data: FieldData<T>) => void;
  style?: CSSProperties;
};

export type FieldGroupItemProps<U> = {
  name: keyof U;
} & HTMLAttributes<HTMLInputElement>;

export type Reform<T> = {
  [K in keyof T]: T[K];
};

export type ReformFields<T> = {
  [K in keyof T]: Field<T, keyof T>;
};

export type ReformField<T, K extends keyof T> = {
  name: K;
  type: ReformFieldType;
  value?: any | undefined;
  ref?: RefObject<HTMLInputElement> | undefined;
  children?: Fields<T> | undefined;
};

export type ReformFieldType = "text" | "number" | "fieldgroup" | "any";

export type ReformDataWithParent<T> = {
  [K in keyof T]: FieldData<T>;
};
export type ReformData<T> = {
  [K in keyof T]: any;
};
