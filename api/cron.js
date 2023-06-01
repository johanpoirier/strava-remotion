const cron = require('node-cron');
const {getFirstRenderToRun, markRenderAsInProgress, markRenderAsDone} = require('./renders');
const {exec} = require('child_process');

const cronSchedule = '* * * * *';

const cronJob = function () {
    getFirstRenderToRun().then(async (render) => {
        if (!render) {
            return;
        }
        console.log(`Render ${render.id} with token ${render.token}`);
        await markRenderAsInProgress(render.id);
        const cmd = `cd .. && npm run render -- InMotion out/render-${render.id}.mp4 --props='{"token": "${render.token}"}'`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            markRenderAsDone(render.id);
        });
    });
}

cron.schedule(cronSchedule, cronJob);
// cronJob(); // start immediately
console.log(`Cronjob is started (${cronSchedule})`);
