import { keys, union } from 'lodash';
import parse from './parsers.js';


export default (firstConfig, secondConfig) => {
  const firstConfigParsed = parse(firstConfig);
  const secondConfigParsed = parse(secondConfig);

  const iter = (first, second, ancestry) => {
    const keysFromFirstObj = keys(first);
    const keysFromSecondObj = keys(second);
    const onlyUniqueKeys = union(keysFromFirstObj, keysFromSecondObj);

    return onlyUniqueKeys.reduce(((acc, key) => {
      if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
        // ОБА ОБЪЕКТЫ, ОБА СОВПАДАЮТ
        if (typeof first[key] === 'object' && typeof second[key] === 'object') {
          return [...acc, {
            key,
            type: 'unchanged',
            ancestry,
            value: iter(first[key], second[key], ancestry + 1),
          },
          ];
        }
        // НЕ ОБЪЕКТЫ, КЛЮЧИ И ЗНАЧЕНИЯ ОДИНАКОВЫЕ UNCHANGED
        if (first[key] === second[key]) {
          return [...acc, {
            key,
            type: 'unchanged',
            ancestry,
            value: first[key],
          },
          ];
        }
        // КЛЮЧИ СОВПАДАЮТ НО РАЗНЫЕ ЗНАЧЕНИЯ CHANGED
        // OLD
        return [...acc, {
          key,
          type: 'deleted',
          ancestry,
          value: first[key],
        },
        // NEW
        {
          key,
          type: 'changed',
          ancestry,
          value: second[key],
          oldValue: first[key],
        },
        ];
      }

      // ЕСТЬ В ПЕРВОМ, НЕТ ВО ВТОРОМ
      if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
        return [...acc, {
          key,
          type: 'deleted',
          ancestry,
          value: first[key],
        },
        ];
      }
      // ЕСТЬ ВО ВТОРОМ, НЕТ В ПЕРВОМ
      return [...acc, {
        key,
        type: 'changed',
        ancestry,
        value: second[key],
      },
      ];
    }), []);
  };

  return iter(firstConfigParsed, secondConfigParsed, 1);
};
