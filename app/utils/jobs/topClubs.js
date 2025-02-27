"use server"
import cron from 'node-cron';
import { getTop5Clubs } from '../../lib/clubsActions/clubActions.js';
import { sendTop5ClubsEmail } from '../../lib/email.js';


async function runWeeklyTopClubsJob() {
    console.log('Running weekly top 5 clubs email job');
    try {
        const top5Clubs = await getTop5Clubs();
        await sendTop5ClubsEmail(top5Clubs);
    } catch (error) {
        console.error('An error occurred while running the weekly email job:', error);
    }
}

//Programar l'enviament del top 5 de discoteques cada setmana diumenge a mitjanit cron.schedule('0 0 * * 0', runWeeklyTop5ClubsJob);
//cron.schedule('0 0 * * 0', runWeeklyTop5ClubsJob);
//Cada 5 minuts
cron.schedule('*/5 * * * *', runWeeklyTopClubsJob);
// Executar la primera vegada
runWeeklyTopClubsJob();