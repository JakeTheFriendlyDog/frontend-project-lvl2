const formatPlain = [
  {
    check: (n) => n === 'unchanged',
    process: (n) => n,
  },
  {
    check: (n) => n === 'changed',
    process: ({ key, value, oldValue }) => `${key} was changed from ${oldValue} to ${value}`,
  },
  {
    check: (n) => n === 'deleted',
    process: ({ key }) => `${key} was deleted`,
  },
];


export default (ast) => {
  const iter = (node) => {
    const {
      key,
      type,
      ancestry,
      value,
      oldValue,
    } = node;
    const { process } = formatPlain.find(({ check }) => check(type));
    return `Property ${process(node)}\n`;
  };
  return `${ast.map(iter).join('')}\n`;
};
