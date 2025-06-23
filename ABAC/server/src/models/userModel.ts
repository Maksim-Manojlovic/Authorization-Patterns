type User = {
  username: string;
  password: string;
  attributes: Record<string, any>;
};

const users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const findUserByUsername = (username: string) => {
  return users.find((user) => user.username === username);
};

export type { User };
