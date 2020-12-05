
export default function formatValue(value: string | undefined, type: ReformFieldType): string | number | undefined {
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