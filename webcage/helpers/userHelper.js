const users = [];

// Join user to chat
function newUser(id, email, forum) {
  const user = { id, email, forum };

  users.push(user);

  return user;
}

// Get current user
function getActiveUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function exitForum(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getIndividualUser(forum) {
  return users.filter(user => user.forum === forum);
}

module.exports = {
  newUser,
  getActiveUser,
  exitForum,
  getIndividualUser
};