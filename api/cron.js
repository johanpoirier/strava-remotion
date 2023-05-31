const cron = require('node-cron');
const {getRendersToRun} = require('./renders');

const cronSchedule = '*/5 * * * *';

cron.schedule(cronSchedule, function() {
    console.log('Checking render requests…');
    getRendersToRun().then((renders) => {
        renders.forEach((render) => console.log(` - render ${render.id} with token ${render.token}`));
    });
});

console.log(`Cronjob is started (${cronSchedule})`);
