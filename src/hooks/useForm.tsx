import React, { useRef, CSSProperties, FC, HTMLAttributes, RefObject } from "react"



type FieldProps<T> = {
  name: keyof T
} & HTMLAttributes<HTMLInputElement>

type FormProps<T> = {
  onSubmit: (data: FieldData<T>) => void
  style?: CSSProperties
}

type FieldGroupItemProps<U> = {
  name: keyof U
}  & HTMLAttributes<HTMLInputElement>

type Form<T> = {
  [K in keyof T]: T[K]
}

export type Fields<T> = {
  [K in keyof T]: Field<T, keyof T>
}

type Field<T, K extends keyof T> = {
  name: K,
  type: FieldType
  value?: any | undefined
  ref?: RefObject<HTMLInputElement> | undefined
  children?: Fields<T> | undefined
}

type FieldType = "text" | "number" | "fieldgroup" | "any"

type FieldDataWithRoot<T> = {
  [K in keyof T]: FieldData<T>
}
type FieldData<T> = {
  [ K in keyof T] : any
}


function initField<T>(form: any): Fields<T> {
  const keys = Object.keys(form) as Array<keyof T>
  const arr: Array<Fields<T>> = keys.map(key => {
    const field = {
      [key]: {
        name: key,
        type: typeof form[key] === "string" ? "text" : typeof form[key] === "number" ? "number" : "fieldgroup",
      } 
    } as Fields<T>
    if (typeof form[key] === "object") {
      field[key].children = initField<T>(form[key])
    } else {
      field[key].value = form[key]
      field[key].ref = useRef<HTMLInputElement>(null)
    }
    return field
  })

  const fields: Fields<T> = Object.assign({}, ...arr) 

  return fields
}


function getItem<T, U>(fields: Fields<T> | undefined, name: keyof U | keyof T, root?: string | undefined): Field<T, keyof T> | undefined {
  if (!fields) {
    return undefined
  }

  const keys = Object.keys(fields) as Array<keyof T>
  var value: Field<T, keyof T> | undefined;

  keys.some(key => {
    const field = fields[key]
    if (field.name === name && root === undefined) {
      value = field
      return true
    }
    if (field.children) {
      if (field.name === root) {
        value = getItem(field.children, name, undefined)
        return value !== undefined
      } else {
        value = getItem(field.children, name, root)
        return value !== undefined
      }

    }
    return false
  })

  return value
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


function toData<T>(fields: Fields<T>, root?: string | undefined): FieldData<T> {
  const keys = Object.keys(fields) as Array<keyof T>
  const arr: Array<FieldData<T>> = keys.map(key => {
    const field = fields[key]
    if (field.type === "fieldgroup") {
      if (field.children) return toData(field.children, field.name.toString())
    }
    const value = formatValue(field.ref?.current?.value, field.type)
    return { [key]: value } as FieldData<T>
  })



  const data: FieldData<T> = Object.assign({}, ...arr)
  if (root) {
    const dataWithRoot = {[root]: {...data}} as FieldDataWithRoot<T>
    return dataWithRoot
  }


  return data
}



export default function useForm<T extends Form<T>>(form: T) {
  const fields: Fields<T> = initField(form)

  const Field: FC<FieldProps<T>> = ({name, placeholder}) => {
    const field = getItem(fields,name, undefined)
    return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref}  />
  }


  const Form: FC<FormProps<T>> = ({children, onSubmit, style}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = toData(fields)
      onSubmit(data)
    }
    return <form onSubmit={handleSubmit} style={style}>{children}</form>
  }


   function useFieldGroup <U>(groupName: string) {
    const FieldGroupItem: FC<FieldGroupItemProps<U>> = ({name, placeholder}) => {
      const field = getItem(fields, name, groupName)
      return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref}  />
    }

    return FieldGroupItem
  }


  return {Form, Field, useFieldGroup}
}
