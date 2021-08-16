const path = require("path");
const fs = require("fs");

const loadUsers = () => {
  const users = fs
    .readFileSync(path.join(__dirname, "..", "users.json"))
    .toString();
  return JSON.parse(users);
};
const saveUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, "..", "users.json"),
    JSON.stringify(users)
  );
};

module.exports = { loadUsers, saveUsers };
