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


// const before = {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// };

// const after = {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// };

// {
//     host: hexlet.io
//   + timeout: 20
//   - timeout: 50
//   - proxy: 123.234.53.22
//   + verbose: true
//   - follow: false
// }

// export default (firstJson, secondJson) => {
//   const objFromFirstJson = JSON.parse(firstJson);
//   const objFromSecondJson = JSON.parse(secondJson);
//   const keysFromFirstObj = Object.keys(objFromFirstJson);
//   const keysFromSecondObj = Object.keys(objFromSecondJson);
//   const allKeys = [...keysFromFirstObj, ...keysFromSecondObj];
//   const onlyUniqueKeys = allKeys.filter((x, i) => i === allKeys.indexOf(x));

//   const reduced = onlyUniqueKeys.reduce(((acc, key) => {
//     if (keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
//       if (objFromFirstJson[key] === objFromSecondJson[key]) {
//         const item = [' ', key, objFromFirstJson[key]];
//         return [...acc, item];
//       }
//       const item = [['-', key, objFromFirstJson[key]], ['+', key, objFromSecondJson[key]]];
//       return [...acc, ...item];
//     }
//     if (keysFromFirstObj.includes(key) && !keysFromSecondObj.includes(key)) {
//       const item = ['-', key, objFromFirstJson[key]];
//       return [...acc, item];
//     }
//     if (!keysFromFirstObj.includes(key) && keysFromSecondObj.includes(key)) {
//       const item = ['+', key, objFromSecondJson[key]];
//       return [...acc, item];
//     }
//     return acc;
//   }), []);
//   console.log(reduced);
//   console.log(JSON.stringify(reduced, null, 2));
//   return 'SpeechRecognitionResult';
// };
