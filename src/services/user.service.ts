export default {
  register(user) {
    return Promise.resolve(user);
  },
  login(user) {
    return Promise.resolve(user);
  },
  resetPassword(email) {
    return Promise.resolve(email);
  }
};
