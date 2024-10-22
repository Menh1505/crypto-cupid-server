import { Schema } from "mongoose";
import { IPreferences } from "./User";

enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export interface IUser extends Document {
    // ...
    gender: Gender;
    // ...
}

const UserSchema = new Schema<IUser>({
    // ...
    gender: { type: String, enum: Object.values(Gender), required: true },
    // ...
});

const PreferencesSchema = new Schema<IPreferences>({
    preferred_gender: { type: String, enum: Object.values(Gender), required: true },
    // ...
});
