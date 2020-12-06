import React, { FC } from "react"
import { getField, initField, toData } from "./utils"



export default function useForm<T extends Reform<T>>(form: T) {
  const fields: ReformFields<T> = initField(form)

  console.log(fields)


  const Form: FC<FormProps<T>> = ({children, onSubmit, style}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(fields)
      const data = toData(fields)
      onSubmit(data)
    }
    return <form onSubmit={handleSubmit} style={style}>{children}</form>
  }


  const Input: FC<InputProps<T>> = ({name, placeholder}) => {
    const field = getField(fields,name, undefined)    
    return <input defaultValue={field?.value}  placeholder={placeholder} ref={field?.ref} />
  }

  const Select: FC<SelectProps<T>> = ({name, items}) => {
    const field = getField(fields,name, undefined)
    console.log("FIELD : ", field)
    return <select ref={field?.ref}>
      {
        items.map(item => <option key={item} value={item}>{item}</option>)
      }
    </select>
  }

  const Radio: FC<RadioProps<T>> = ({name, items}) => {
    const field = getField(fields, name, undefined)
    if (!field) return <></>
    return <div ref={field.ref} id={`root-radios-${name}`}>
      {

        items.map(item => (
          <div key={item}>
            <input  type="radio" id={item} name={name.toString()} value={item}/>
            <label htmlFor={item}>{item}</label>
          </div>
        ))
      }
    </div>
  }

  const Checkbox: FC<CheckboxProps<T>> = ({name, items}) => {
    const field = getField(fields, name, undefined)
    if (!field) return <></>
    return <div ref={field.ref} id={`root--checkboxes-${name}`}>
    {

      items.map(item => (
        <div key={item}>
          <input  type="checkbox" id={item} name={name.toString()} value={item} defaultChecked={Array.isArray(field.value) ? field.value.includes(item) : field.value === item ? true : false}  />
          <label htmlFor={item}>{item}</label>
        </div>
      ))
    }
  </div>
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


    const CheckboxGroup: FC<CheckboxGroupProps<U>> = ({name, items}) => {
      const field = getField(fields, name, groupName)
      if (!field) return <></>
      return <div ref={field.ref} id={`${groupName}-checkboxes-${name}`}>
        {
  
          items.map(item => (
            <div key={item}>
              <input  type="checkbox" id={item} name={name.toString()} value={item} defaultChecked={Array.isArray(field.value) ? field.value.includes(item) : field.value === item ? true : false}  />
              <label htmlFor={item}>{item}</label>
            </div>
          ))
        }
      </div>
    }
    


    return {InputGroup, SelectGroup,CheckboxGroup }
  }


  return {Form, Input,Select,Radio, Checkbox,useFieldGroup}
}
