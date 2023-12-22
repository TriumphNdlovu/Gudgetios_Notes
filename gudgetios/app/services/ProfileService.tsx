import { Profile } from "../interfaces/Profile";
import { getProfileDetails } from "../repository/ProfileCrud";


export const getProfileService = async (): Promise<Profile> => {
    
    return getProfileDetails();
}