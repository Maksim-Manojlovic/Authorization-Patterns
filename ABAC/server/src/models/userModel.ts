type User = {
  username: string;
  password: string; // u realnim aplikacijama ovo mora biti hashirano
  attributes: Record<string, any>; // npr. age, location, department...
};

const users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const findUserByUsername = (username: string) => {
  return users.find((user) => user.username === username);
};

export type { User };
