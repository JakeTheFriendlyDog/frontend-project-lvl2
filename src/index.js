export default (firstJson, secondJson) => {
  const objFromFirstJson = JSON.parse(firstJson);
  const objFromSecondJson = JSON.parse(secondJson);
  const keysFromFirstObj = Object.keys(objFromFirstJson);
  const keysFromSecondObj = Object.keys(objFromSecondJson);
  const allKeys = [...keysFromFirstObj, ...keysFromSecondObj];
  const onlyUniqueKeys = allKeys.filter((x, i) => i === allKeys.indexOf(x));

  const differences = onlyUniqueKeys.reduce(((acc, key) => {
    if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
      if (objFromFirstJson[key] === objFromSecondJson[key]) {
        acc[`  ${key}`] = objFromFirstJson[key];
        return acc;
      }
      acc[`- ${key}`] = objFromFirstJson[key];
      acc[`+ ${key}`] = objFromSecondJson[key];
    }
    if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
      acc[`- ${key}`] = objFromFirstJson[key];
    }
    if (!keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
      acc[`+ ${key}`] = objFromSecondJson[key];
    }
    return acc;
  }), {});

  const result = JSON.stringify(differences, null, 2).replace(/,/g, '').replace(/"/g, '');
  console.log(result);
  return result;
};
