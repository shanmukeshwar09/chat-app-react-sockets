const users = [];

const addUser = (id, name, room) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );

  if (existingUser) return { error: "User aleready Exists" };

  const user = { name, room, id };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter(user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
