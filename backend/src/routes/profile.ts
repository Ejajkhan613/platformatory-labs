import express from 'express';
import User from '../models/User';

import { Connection, Client } from '@temporalio/client';

const router = express.Router();

// GET /api/profile
router.get('/', async (req: any, res: any) => {
    try {
        const sub = req.auth?.payload?.sub;
        if (!sub) return res.status(400).json({ error: 'Invalid token payload' });

        let user = await User.findOne({ sub });
        if (!user) {
            user = await User.create({ sub }); // auto-create empty profile
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// POST /api/profile
// router.post('/', async (req: any, res: any) => {
//     try {
//         const sub = req.auth?.payload?.sub;
//         if (!sub) return res.status(400).json({ error: 'Invalid token payload' });

//         const { firstName, lastName, phone, city, pincode } = req.body;

//         const updatedUser = await User.findOneAndUpdate(
//             { sub },
//             { firstName, lastName, phone, city, pincode },
//             { new: true, upsert: true }
//         );

//         res.json(updatedUser);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to update profile' });
//     }
// });


router.post('/', async (req: any, res: any) => {
    const connection = await Connection.connect();
    const client = new Client({ connection });

    const workflow = client.workflow;
    const handle = await workflow.start('updateProfileWorkflow', {
        taskQueue: 'profile-queue',
        args: [req.body],
        workflowId: `profile-${req.auth.payload.sub}-${Date.now()}`
    });

    res.json({ message: 'Workflow started', runId: handle.workflowId });
});


module.exports = router;