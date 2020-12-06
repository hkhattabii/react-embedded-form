import { RefObject } from "react"
import { formatValue } from "."


export default function toData<T>(fields: ReformFields<T>, root?: string | undefined): ReformData<T> {
    const keys = Object.keys(fields) as Array<keyof T>
    const arr: Array<ReformData<T>> = keys.map(key => {
      const field = fields[key]
      if (field.children) {
        return toData(field.children, field.name.toString()) 
      }
      if (!field.ref?.current) {
        return { [key]: undefined } as ReformData<T>
      }
      if (field.ref?.current?.id.includes("radios")) {
        const ref = field.ref as RefObject<HTMLDivElement>
        const radios = Array.from(ref.current?.children as HTMLCollectionOf<HTMLDivElement>)
        const radio = radios.find(checkbox => {
          const input = checkbox.firstElementChild as HTMLInputElement
          if (input.checked) {
            return true
          }
          return false
        })
        if (radio) {
          const input = radio.firstElementChild as HTMLInputElement
          return { [key]: input.value} as  ReformData<T>
        } 
   
      } else if (field.ref?.current.id.includes("checkboxes")) {
        const ref = field.ref as RefObject<HTMLDivElement>
        const checkboxes = Array.from(ref.current?.children as HTMLCollectionOf<HTMLDivElement>)
        const checkboxesChecked = checkboxes.filter(checkbox => {
          const input = checkbox.firstElementChild as HTMLInputElement
          return input.checked === true
        })
        const checkboxedValue = checkboxesChecked.map(checkboxeChecked => {
          const checkbox = checkboxeChecked.firstElementChild as HTMLInputElement
          return checkbox.value
        })
        return { [key]: checkboxedValue } as ReformData<T>
      }
    
      const value = formatValue(field.ref?.current?.value, field.type)
      return { [key]: value } as ReformData<T>
    })
  
  
  
    const data: ReformData<T> = Object.assign({}, ...arr)
    if (root) {
      const dataWithRoot = {[root]: {...data}} as ReformDataWithParent<T>
      return dataWithRoot
    }
  
  
    return data
  }


  
  