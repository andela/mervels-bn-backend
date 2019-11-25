/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable no-useless-catch */
import database from '../database/models';

const { UserProfile, Users, ProfilePictures } = database;

class UserProfileService {
  async updateOrCreate(userId, profileData = null) {
    try {
      // Find a profile by userId
      const profileFound = await UserProfile.findOne({ where: { userId } });

      // Creates profile if not
      if (!profileFound) return await UserProfile.create({ userId });

      // Updated profile by userId
      const updatedProfile = await UserProfile.update(profileData, {
        where: { userId }
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      const profile = await Users.findOne({
        attributes: ['firstName', 'lastName', 'userEmail', 'userRoles', 'requestAutofill'],
        where: { id: userId },
        include: [{ model: UserProfile, as: 'userProfile' }]
      });

      return profile;
    } catch (error) {
      throw error;
    }
  }

  async updateOrCreatePicture(user, data) {
    try {
      const profileFound = await ProfilePictures.findOne({ where: { user } });
      if (!profileFound) await ProfilePictures.create({ user });
      const updatedProfile = await ProfilePictures.update(data, {
        where: { user },
        returning: true
      });
      return updatedProfile;
    } catch (error) {
      throw error;
    }
  }

  async getPicture(user) {
    try {
      return await ProfilePictures.findOne({
        where: { user }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new UserProfileService();
