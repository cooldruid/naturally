import AsyncStorage from '@react-native-async-storage/async-storage';
import showSimpleAsyncAlert from '../utilities/alert';

const SETTINGS_KEY = 'userSettings';

export type UserSettings = {
    showVegan: boolean ;
    showVegetarian: boolean;
}

export async function getUserSettings(): Promise<UserSettings | undefined> {
    try {
        const json = await AsyncStorage.getItem(SETTINGS_KEY);

        if(json) 
            return JSON.parse(json);

        return {
            showVegan: true,
            showVegetarian: true
        }
    }
    catch(error) {
        console.error('Failed to load settings: ', error);
        showSimpleAsyncAlert('Failed to load settings', 'Please try again later or submit an issue.');

        return undefined;
    }
}

export async function saveUserSettings(userSettings: UserSettings) {
    try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(userSettings));
    } 
    catch (error) {
        console.error('Failed to save settings', error);
        showSimpleAsyncAlert('Failed to save settings', 'Please try again later or submit an issue.');
    }
}