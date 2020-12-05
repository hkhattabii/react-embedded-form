import React, { FC } from "react"
import { getField, initField, toData } from "./utils"



export default function useForm<T extends Reform<T>>(form: T) {
  let fields: ReformFields<T> = initField(form)


  const Form: FC<FormProps<T>> = ({children, onSubmit, style}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(fields)
      const data = toData(fields)
      onSubmit(data)
    }
    return <form onSubmit={handleSubmit} style={style}>{children}</form>
  }


  const Input: FC<InputProps<T>> = ({name, placeholder, ...props}) => {
    const field = getField(fields,name, undefined)    
    return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref} />
  }

  const Select: FC<SelectProps<T>> = ({name, items}) => {
    const field = getField(fields,name, undefined)
    return <select ref={field?.ref}>
      {
        items.map(item => <option key={item} value={item}>{item}</option>)
      }
    </select>
  }

   function useFieldGroup <U>(groupName: string) {

    const InputGroup: FC<InputGroupProps<U>> = ({name, placeholder}) => {
      const field = getField(fields,name,groupName)
      return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref} />
    }

    const SelectGroup: FC<SelectGroupProps<U>> = ({name, items, placeholder}) => {
      const field = getField(fields, name, groupName)
      return <select ref={field?.ref}>
      {
        items.map(item => <option key={item} value={item}>{item}</option>)
      }
    </select>
    }
    


    return {InputGroup, SelectGroup}
  }


  return {Form, Input,Select,useFieldGroup}
}
