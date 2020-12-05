

export default function getField<T, U>(fields: ReformFields<T> | undefined, name: keyof U | keyof T, root?: string | undefined): ReformField<T, keyof T> | undefined {
    if (!fields) {
      return undefined
    }
  
    const keys = Object.keys(fields) as Array<keyof T>
    var value: ReformField<T, keyof T> | undefined;
  
    keys.some(key => {
      const field = fields[key]
      if (field.name === name && root === undefined) {
        value = field
        return true
      }
      if (field.children) {
        if (field.name === root) {
          value = getField(field.children, name, undefined)
          return value !== undefined
        } else {
          value = getField(field.children, name, root)
          return value !== undefined
        }
  
      }
      return false
    })
  
    return value
  }