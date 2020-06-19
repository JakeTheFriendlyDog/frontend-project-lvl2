import { keys, union } from 'lodash';
import parse from './parsers.js';


const makeNode = (key, type, ancestry, value, parent, oldValue) => ({
  key,
  type,
  ancestry,
  value,
  parent,
  oldValue,
});

export default (firstConfig, secondConfig) => {
  const firstConfigParsed = parse(firstConfig);
  const secondConfigParsed = parse(secondConfig);

  const iter = (first, second, ancestry, parent = null) => {
    const keysFromFirstObj = keys(first);
    const keysFromSecondObj = keys(second);
    const onlyUniqueKeys = union(keysFromFirstObj, keysFromSecondObj);

    return onlyUniqueKeys.flatMap(((key) => {
      if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
        // ОБА ОБЪЕКТЫ, ОБА СОВПАДАЮТ
        if (typeof first[key] === 'object' && typeof second[key] === 'object') {
          return makeNode(key, 'unchanged', ancestry, iter(first[key], second[key], ancestry + 1, key), parent);
        }
        // НЕ ОБЪЕКТЫ, КЛЮЧИ И ЗНАЧЕНИЯ ОДИНАКОВЫЕ UNCHANGED
        if (first[key] === second[key]) {
          return makeNode(key, 'unchanged', ancestry, first[key], parent);
        }
        // КЛЮЧИ СОВПАДАЮТ НО РАЗНЫЕ ЗНАЧЕНИЯ CHANGED
        return [makeNode(key, 'deleted', ancestry, first[key], parent),
          makeNode(key, 'changed', ancestry, second[key], parent, first[key])];
      }

      // ЕСТЬ В ПЕРВОМ, НЕТ ВО ВТОРОМ
      if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
        return makeNode(key, 'deleted', ancestry, first[key], parent);
      }
      // ЕСТЬ ВО ВТОРОМ, НЕТ В ПЕРВОМ
      return makeNode(key, 'changed', ancestry, second[key], parent);
    }));
  };

  return iter(firstConfigParsed, secondConfigParsed, 1);
};
