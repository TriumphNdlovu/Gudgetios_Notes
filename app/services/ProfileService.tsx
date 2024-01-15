import { Profile } from "../interfaces/Profile";
import { createProfile, getProfileDetails } from "../repository/ProfileCrud";


export const getProfileService = async (): Promise<Profile> => {
    
    return getProfileDetails();
}

export const createProfileService = async (profile: Profile): Promise<any> => {
    return createProfile(profile);
}