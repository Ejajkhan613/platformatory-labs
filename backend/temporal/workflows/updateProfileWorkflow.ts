import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities/profileActivities';

const { saveToDb, sendToCrudCrud } = proxyActivities<typeof activities>({
    startToCloseTimeout: '10s',
});

export async function updateProfileWorkflow(profileData: any): Promise<void> {
    await saveToDb(profileData);
    await new Promise(res => setTimeout(res, 10000));
    await sendToCrudCrud(profileData);
}