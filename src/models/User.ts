// src/models/User.ts
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IPreferences {
    preferred_gender: string;
    age_min: number;
    age_max: number;
    location_radius_km: number;
}

export interface IPhoto {
    photo_url: string;
    uploaded_at: Date;
}

export interface ILocation {
    latitude: number;
    longitude: number;
    updated_at: Date;
}

export interface IUser extends Document {
    googleId?: string;
    facebookId?: string;
    password_hash?: string;
    name?: string;
    birthdate?: Date;
    gender?: string;
    profile_photo?: string;
    bio?: string;
    created_at?: Date;
    updated_at?: Date;
    preferences?: IPreferences;
    photos?: IPhoto[];
    location?: string;
}

const PreferencesSchema = {
    preferred_gender: { type: String, required: true },
    age_min: { type: Number, required: true },
    age_max: { type: Number, required: true },
    location_radius_km: { type: Number, required: true },
};

const PhotoSchema = {
    photo_url: { type: String, required: true },
    uploaded_at: { type: Date, default: Date.now },
};

const LocationSchema = {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    updated_at: { type: Date, default: Date.now },
};

const UserSchema = new Schema<IUser>(
    {
        googleId: { type: String, unique: true },
        facebookId: { type: String, unique: true },
        password_hash: { type: String, required: false },
        name: { type: String, required: false },
        birthdate: { type: Date, required: false },
        gender: { type: String, required: false },
        profile_photo: { type: String, required: false },
        bio: { type: String, required: false },
        preferences: { type: PreferencesSchema, required: false },
        photos: { type: [PhotoSchema], default: [] },
        location: { type: String, required: false },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
