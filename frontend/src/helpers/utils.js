import _ from 'underscore';

/**
 * Resolves a item on a session storage or local storage
 * @param item
 * @returns {null}
 */
export const resolveOnStorage = item => {
  if (typeof sessionStorage !== 'undefined' && typeof localStorage !== 'undefined') {
    let itemStorage = sessionStorage && !!sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : null;

    if (!itemStorage) {
      itemStorage = localStorage && !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : null;
    }
    return itemStorage;

  } else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    console.warn('resolveOnStorage: Sorry, but this function isn\'t implemented for ReactNative yet')
  } else {
    console.warn('resolveOnStorage: Sorry, but this function isn\'t implemented for NodeJs yet');
  }
};

/**
 * Saves an item on a session or local storage
 * @param name
 * @param item
 * @param isSessionStorage
 * @returns {null}
 */
export const saveOnStorage = (name, item, isSessionStorage = true) => {
  if (typeof sessionStorage !== 'undefined' && typeof localStorage !== 'undefined') {
    let storage = isSessionStorage ? sessionStorage : localStorage;
    storage.setItem(name, JSON.stringify(item))
  } else if (typeof navigator != 'undefined' && navigator.product === 'ReactNative') {
    console.warn('saveOnStorage: Sorry, but this function isn\'t implemented for ReactNative yet')
  } else {
    console.warn('saveOnStorage: Sorry, but this function isn\'t implemented for NodeJs yet');
  }
};

/**
 * Removes an item from session or local storage
 * @param name
 * @returns {null}
 */
export const clearFromStorage = name => {
  if (typeof sessionStorage !== 'undefined' && typeof localStorage !== 'undefined') {
    sessionStorage.removeItem(name);
    localStorage.removeItem(name);
  } else if (typeof navigator != 'undefined' && navigator.product === 'ReactNative') {
    console.warn('clearOnStorage: Sorry, but this function isn\'t implemented for ReactNative yet')
  } else {
    console.warn('clearOnStorage: Sorry, but this function isn\'t implemented for NodeJs yet');
  }
};

/**
 * Check if user roles has required roles
 * @param userRoles - [...]
 * @param requiredRoles - [...]
 * @param matchMode - {'all', 'any'}
 * @returns {boolean} - true if matches, else otherwise
 */
export const isAuthorized = (userRoles, requiredRoles) => {
  if (!requiredRoles || !userRoles) {
    throw new Error('isAuthorized(): requiredRoles and userRoles properties are required.');
  }

  const roles = userRoles.split('.');

  let intersection = _.intersection(roles, requiredRoles)

  return intersection.length > 0;
};
