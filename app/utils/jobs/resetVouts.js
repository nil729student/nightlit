
import cron from 'node-cron';
import { deleteWeeklyVotes } from '../../lib/clubsActions/pullActions/deleteWeeklyVotes.js';

// Programar l'eliminació de votacions diumenge a mitjanit: 0 0 * * 0
cron.schedule('*/1 * * * *', async () => {
    console.log('Running weekly vote deletion');
    await deleteWeeklyVotes();
});