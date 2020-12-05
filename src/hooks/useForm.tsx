import React, { FC } from "react"
import { getField, initField, toData } from "./utils"



export default function useForm<T extends Reform<T>>(form: T) {
  const fields: ReformFields<T> = initField(form)

  const Field: FC<FieldProps<T>> = ({name, placeholder}) => {
    const field = getField(fields,name, undefined)
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
      const field = getField(fields, name, groupName)
      return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref}  />
    }

    return FieldGroupItem
  }


  return {Form, Field, useFieldGroup}
}
