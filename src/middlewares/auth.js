import SessionManger from '../utils/sessionManager';
import Response from '../utils/response';

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log(token);
    const payload = await SessionManger.decodeToken({ token });

    // if(!payload.userVerified) Response.errorResponse(res,401,'User account not verified');
    const result = await SessionManger.verifyToken(payload.userEmail);

    if (result === null) return Response.errorResponse(res, 401, 'User not logged In');

    req.user = payload;
    next();
  } catch (error) {
    return Response.errorResponse(res, 401, 'Invalid or expired token used', error);
  }
};

export default verify;
