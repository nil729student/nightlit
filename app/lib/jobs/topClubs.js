"use server"
import cron from 'node-cron';
import { getTop5Clubs } from '../clubsActions/clubActions.js';
import { sendTop5ClubsEmail } from '../email.js';


async function runWeeklyTop5ClubsJob() {
    console.log('Running weekly top 5 clubs email job');
    try {
        const top5Clubs = await getTop5Clubs();
        await sendTop5ClubsEmail(top5Clubs);
    } catch (error) {
        console.error('An error occurred while running the weekly email job:', error);
    }
}

//Programar l'enviament del top 5 de discoteques cada setmana diumenge a mitjanit cron.schedule('0 0 * * 0', runWeeklyTop5ClubsJob);
cron.schedule('0 0 * * 0', runWeeklyTop5ClubsJob);
// Executar la primera vegada
runWeeklyTop5ClubsJob();