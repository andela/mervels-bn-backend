import SessionManger from '../utils/sessionManager';
import Response from '../utils/response';
import userService from '../services/userService';

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManger.decodeToken({ token });

    // if(!payload.userVerified) Response.errorResponse(res,401,'User account not verified');
    const result = await SessionManger.verifyToken(payload.userEmail);

    if (result === null) return Response.errorResponse(res, 401, 'User not logged In');
    const { userEmail } = payload;
    // checking for the updated userRole from the db not from the token
    const { userRoles } = await userService.findUserByEmail(userEmail);
    payload.userRoles = userRoles;
    req.user = payload;
    next();
  } catch (error) {
    return Response.errorResponse(res, 401, 'Invalid or expired token used', error);
  }
};

export default verify;
