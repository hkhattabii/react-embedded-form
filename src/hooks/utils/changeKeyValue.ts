/**
 * 1. Take the keys of the object
 * 2. create the value that you want to insert for the specific key and return it on the callback function
 * 3. return the new value with the pairs key:value
 * 4. create a new object from the key:value array to have a key: value object
 *
 *
 * @param obj the object provided to change its values type
 * @param callbackFn return the current key and index
 * @return the new object
 */
export default function changeKeyValue<T, U extends unknown, V>(
  obj: T,
  callbackFn: (key: keyof T, index: number) => V
): U {
  const keys = Object.keys(obj) as Array<keyof T>;
  const arr: Array<U> = keys.map((key, index) => {
    const value = callbackFn(key, index);
    return { [key]: value } as U;
  });
  const newObj: U = Object.assign({}, ...arr);
  return newObj;
}
