import { isEqual } from 'lodash';

const inArray = function(collection, element) {
  for (let i = 0; i < collection.length; i++) {
    if (isEqual(collection[i], element)) return true;
    else continue;
  }
  return false;
};

const itemExists = function(collection, element) {
    console.log("Collection: ", collection);
    console.log("Element: ", element)
  if (
    Array.isArray(collection) &&
    collection.length > 0 &&
    (element !== null || element !== undefined)
  ) {
    if (inArray(collection, element)) return true;
    else return false;
  } else return null;
};

export default itemExists;