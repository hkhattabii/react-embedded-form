import { useRef } from 'react'

export default function initField<T>(form: any): ReformFields<T> {
    const keys = Object.keys(form) as Array<keyof T>
    const arr: Array<ReformFields<T>> = keys.map(key => {
      const field = {
        [key]: {
          name: key,
          type: typeof form[key] === "string" ? "text" : typeof form[key] === "number" ? "number" : "fieldgroup",
        } 
      } as ReformFields<T>
      if (typeof form[key] === "object") {
        field[key].children = initField<T>(form[key])
      } else {
        field[key].value = form[key]
        field[key].ref = useRef<HTMLInputElement>(null)
      }
      return field
    })
  
    const fields: ReformFields<T> = Object.assign({}, ...arr) 
  
    return fields
  }