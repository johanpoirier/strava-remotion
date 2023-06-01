const cron = require('node-cron');
const {
    getFirstRenderToRun,
    markRenderAsInProgress,
    markRenderAsDone,
    markRenderAsFailed,
    isRenderInProgress,
    cleanRenderingJobs
} = require('./renders');
const {exec} = require('child_process');

const cronSchedule = '* * * * *';

const cronJob = async function () {
    if (await isRenderInProgress()) {
        console.log('render already in progress');
        return;
    }

    const render = await getFirstRenderToRun();
    if (!render) {
        return;
    }

    console.log(`Render ${render.id} with token ${render.token}`);
    await markRenderAsInProgress(render.id);

    const cmd = `cd .. && npm run render -- InMotion out/render-${render.id}.mp4 --props='{"token": "${render.token}", "activityCount": ${render.activityCount}}'`;
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            markRenderAsFailed(render.id);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            markRenderAsFailed(render.id);
            return;
        }
        console.log(`stdout: ${stdout}`);
        markRenderAsDone(render.id);
    });
}

cleanRenderingJobs().then(() => {
    cron.schedule(cronSchedule, cronJob);
    console.log(`Cronjob is started (${cronSchedule})`);
    cronJob();
}).catch(console.error);
