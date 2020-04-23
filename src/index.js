import parse from './parsers.js';

export default (firstConfig, secondConfig) => {
  const objFromFirstConfig = parse(firstConfig);
  const objFromSecondConfig = parse(secondConfig);
  const keysFromFirstObj = Object.keys(objFromFirstConfig);
  const keysFromSecondObj = Object.keys(objFromSecondConfig);
  const allKeys = [...keysFromFirstObj, ...keysFromSecondObj];
  const onlyUniqueKeys = allKeys.filter((x, i) => i === allKeys.indexOf(x));

  const differences = onlyUniqueKeys.reduce(((acc, key) => {
    if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
      if (objFromFirstConfig[key] === objFromSecondConfig[key]) {
        acc[`  ${key}`] = objFromFirstConfig[key];
        return acc;
      }
      acc[`- ${key}`] = objFromFirstConfig[key];
      acc[`+ ${key}`] = objFromSecondConfig[key];
    }
    if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
      acc[`- ${key}`] = objFromFirstConfig[key];
    }
    if (!keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
      acc[`+ ${key}`] = objFromSecondConfig[key];
    }
    return acc;
  }), {});

  const result = JSON.stringify(differences, null, 2).replace(/,/g, '').replace(/"/g, '');
  console.log(result);
  return result;
};
