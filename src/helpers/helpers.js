export const checkForItems = cat => !!(cat && cat.length);
export const checkItemsById = (requestId, array) => array.find(item => item.id === requestId);