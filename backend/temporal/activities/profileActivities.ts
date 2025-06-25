// temporal/activities/profileActivities.ts
import mongoose from 'mongoose';
import axios from 'axios';
import User from '../../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

async function connectToDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/temporal');
        isConnected = true;
        console.log('Temporal worker connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed in Temporal worker:', err);
        throw err;
    }
}

export async function saveToDb(data: any) {
    await connectToDB();
    console.log('Saving user to MongoDB via Temporal...');
    await User.findOneAndUpdate({ sub: data.sub }, data, { upsert: true });
    console.log('Saved user to MongoDB via Temporal...');
    console.log('Waiting till 10 Seconds');
}

export async function sendToCrudCrud(data: any) {
    console.log('Sending profile to CrudCrud...');
    const apiId = process.env.CRUDCRUD_API_ID;
    const url = `https://crudcrud.com/api/${apiId}/profile`;

    const { _id, ...safeData } = data;

    try {
        await axios.post(url, safeData);
        console.log('Saved profile details in CrudCrud');
    } catch (err: any) {
        if (err.response) {
            console.error('Error status:', err.response.status);
            console.error('Error data:', err.response.data);
        } else {
            console.error('Unknown error:', err.message);
        }
        throw err;
    }
}