import jwt from "jsonwebtoken";

const generateToken = data => {
  const token = jwt.sign(
    {
      id: data.id,
      email: data.userEmail,
      firstName: data.firstName,
      lastName: data.lastName
    },
    process.env.TOKEN
  );
  return token;
};

export default generateToken;
