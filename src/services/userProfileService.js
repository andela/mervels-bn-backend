/* eslint-disable no-useless-catch */
import database from '../database/models';

const { UserProfile } = database;
const { Users } = database;

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
        attributes: ['firstName', 'lastName', 'userEmail', 'userRoles'],
        where: { id: userId },
        include: [{ model: UserProfile, as: 'userProfile' }]
      });

      return profile;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserProfileService();
