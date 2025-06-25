import { Worker } from '@temporalio/worker';
import * as activities from './activities/profileActivities';

async function run() {
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows/updateProfileWorkflow'),
        activities,
        taskQueue: 'profile-queue',
    });

    await worker.run();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});