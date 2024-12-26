"use server"
import cron from 'node-cron';
import { deleteWeeklyVotes } from '../clubsActions/pullActions/userPullActions.js';

// Programar l'eliminació de votacions diumenge a mitjanit
cron.schedule('0 0 * * 0', async () => {
    console.log('Running weekly vote deletion');
    await deleteWeeklyVotes();
});