import Mock from "../mock";

const userList = [
  {
    id: 1,
    name: "Jason Alexander",
    username: "jason_alexander",
    email: "jason@ui-lib.com",
    password: "123456",
    avatar: "/assets/images/face-6.jpg",
    age: 25
  }
];

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

Mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    const { email, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email && u.password === password);

    if (!user) return [400, { message: "Invalid email or password" }];

    const payload = { user: user };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onPost("/api/auth/register").reply((config) => {
  try {
    const { email, username, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) return [400, { message: "User already exists!" }];

    const newUser = {
      id: userList.length + 1,
      name: username || `Unknown-${Math.floor(Math.random() * 100)}`,
      age: 25,
      email: email,
      username: username,
      password: password,
      avatar: "/assets/images/face-6.jpg"
    };

    userList.push(newUser);

    const payload = { user: { ...newUser } };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

