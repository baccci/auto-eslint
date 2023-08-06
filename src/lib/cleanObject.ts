interface GenericObject { [key: string]: any }

export default function cleanObject(obj: GenericObject) {
  const objectCopy = structuredClone(obj)

  const newObject: GenericObject = {}

  Object.keys(objectCopy).forEach((key) => {

    const propertyIsNullish = objectCopy[key] === null ||
      objectCopy[key] === undefined ||
      objectCopy[key] === '' ||
      (Array.isArray(objectCopy[key]) && objectCopy[key].length === 0) ||
      (typeof objectCopy[key] === 'object' &&
        Object.keys(objectCopy[key]).length === 0)

    if (!propertyIsNullish) {
      newObject[key] = objectCopy[key]
    }
  })

  return newObject
}
