const storeInSession = (key, value) => {
  sessionStorage.setItem(key, value);
};

const lookInSession = (key, value) => {
  return sessionStorage.getItem(key);
};

const removeFromSession = (key, value) => {
  sessionStorage.removeItem(key);
};

const logOutUser = (key, value) => {
  sessionStorage.clear();
};

export { storeInSession, lookInSession, removeFromSession, logOutUser };
