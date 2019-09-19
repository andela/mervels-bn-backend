import jwt from 'jsonwebtoken';

const generateToken = (data) => {
  const token = jwt.sign(
    {
      id: data.id,
      email: data.userEmail,
      firstName: data.firstName,
      userRole: data.userRole,
      lastName: data.lastName
    },
    process.env.TOKEN
  );
  return token;
};

export default generateToken;
