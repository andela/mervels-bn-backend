/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
import UserProfileService from '../services/userProfileService';
import UserService from '../services/userService';
import Response from '../utils/response';

class userProfileController {
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      await UserService.updateUser({ id: userId }, req.body);

      await UserProfileService.updateOrCreate(userId, req.body);

      const profile = await UserProfileService.getProfile(userId);
      const profileData = profile.dataValues.userProfile.dataValues;
      res.cookie('passportNumber', profileData.passportNumber);
      res.cookie('passportName', profileData.passportName);
      res.cookie('gender', profileData.gender);
      return Response.customResponse(res, 200, 'User Profile Updated', profile);
    } catch (error) {
      return next(error);
    }
  }

  async userProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const profile = await UserProfileService.getProfile(userId);

      return Response.customResponse(res, 200, 'User Profile Updated', profile);
    } catch (error) {
      return next(error);
    }
  }
}

export default new userProfileController();
