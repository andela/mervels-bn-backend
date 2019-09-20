/* eslint-disable require-jsdoc */
import UserProfileService from '../services/userProfileService';
import UserService from '../services/userService';
import Response from '../utils/response';

class userProfileController {
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      await UserService.updateUser(userId, req.body);

      await UserProfileService.updateOrCreate(userId, req.body);

      const profile = await UserProfileService.getProfile(userId);
      return Response.customResponse(res, 200, 'User Profile Updated', profile);
    } catch (error) {
      return Response.errorResponse(
        res,
        500,
        'Something went wrong when updating userProfile',
        error
      );
    }
  }

  async userProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const profile = await UserProfileService.getProfile(userId);

      return Response.customResponse(res, 200, 'User Profile Updated', profile);
    } catch (error) {
      return Response.errorResponse(
        res,
        500,
        'Something went wrong when getting userProfile',
        error
      );
    }
  }
}

export default new userProfileController();
