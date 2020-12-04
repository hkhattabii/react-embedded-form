import React, {useRef, CSSProperties, FC, RefObject, FormEvent} from "react";
import {changeKeyValue} from './utils'

type FieldType = "text" | "number" | "any"

type FieldProps<T> = {
  name: keyof T
  refParent?: keyof T
} & React.HTMLAttributes<HTMLInputElement>


type FieldGroupItem<T> = {
  parent: T
  item: keyof T
}

type FormProps<T> = {
  onSubmit: (data: FormData<T>) => void
  style?: CSSProperties
}

type SubField<T> = {
[k in keyof T]: Field<T>
}

type Field<T> = {
  [k in keyof T]: {
    type: FieldType
    ref: RefObject<HTMLInputElement>
  } 
}

type FormData<T> = {
  [K in keyof T]: any
}



function initField<T>(form: T, rootName?: string | undefined): Field<T> | SubField<T> {
  const keys = Object.keys(form) as Array<keyof T>
  const arr: Array<Field<T> | SubField<T>> = keys.map((key) => {
    if (typeof form[key] === "object") {
      const subField = initField(form[key] as any, key.toString())
      return subField
    }
    const type: FieldType = typeof form[key] === "string" ? "text" : typeof form[key] === "number" ? "number" : "any"
    const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    return { [key]: {
      type: type,
      ref: ref
    }} as Field<T> 
  })
  const fields: Field<T> = Object.assign({}, ...arr)
  if (rootName) {
    const fieldWithRoot: SubField<T> = {[rootName]: {...fields}} as SubField<T>
    return fieldWithRoot
  }
  return fields
}


function formatValue(value: string | undefined, type: FieldType): string | number | undefined {
  if (!value) return value
  switch(type) {
    case "text": return value
    case "number": 
      const formatedValue  = parseInt(value)
      if (isNaN(formatedValue)) throw new Error(`Cannot convert ${value} to a number`)
      return formatedValue
    case "any": return value
  }
}


function createFormdata<T>(fields: Field<T>) {
  /*
  return changeKeyValue<Field<T>, FormData<T>, string | number | undefined>(fields, (key) => {
    const value: string | undefined = fields[key].ref.current?.value
    const type = fields[key].type
    return formatValue(value, type)
  })
  */
}




export default function useForm<T>(form: T) {
  const fields = initField(form) as Field<T>

  console.log(fields)

  const Field: FC<FieldProps<T>> = ({name, placeholder}) => {
    return <input placeholder={placeholder}  />
  }

  const Form: FC<FormProps<T>> = ({onSubmit, style, children}) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(fields)
      /*
      const data = createFormdata(fields)
      onSubmit(data)
      */
    }
    return <form onSubmit={handleSubmit} style={style}>{children}</form>
  }


  return {Form, Field}

}



export function FieldGroupItem<T>({parent, item}: FieldGroupItem<T>) {
  const {Field} = useForm(parent)
  return <Field name={item} placeholder={item.toString()}  />

}

