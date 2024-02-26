export const jsonParseDeep = (
  str: string,
): Record<string, unknown> | undefined => {
  if (!str.includes('{')) return;
  try {
    const data = JSON.parse(str);
    for (const property in data) {
      if (typeof data[property] === 'string') {
        if (data[property].includes('{'))
          data[property] = jsonParseDeep(data[property] as string);
      }
    }
    return data;
  } catch (error) {
    console.log('An error occured while parsing json: ', error);
  }
};
