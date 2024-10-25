/************************/

// VALIDATION DES JSON //

/***********************/
export const validateJSONStructure = (data) => {
  if (Array.isArray(data)) {
    return data.every(item => validateJSONStructure(item));
  } else if (typeof data === 'object' && data !== null) {
    return Object.values(data).every(value => validateJSONStructure(value));
  } else {
    return ['string', 'number', 'boolean'].includes(typeof data);
  }
};