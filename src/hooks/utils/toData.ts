import { formatValue } from "."


export default function toData<T>(fields: ReformFields<T>, root?: string | undefined): ReformData<T> {
    const keys = Object.keys(fields) as Array<keyof T>
    const arr: Array<ReformData<T>> = keys.map(key => {
      const field = fields[key]
      if (field.children) {
        return toData(field.children, field.name.toString()) 
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