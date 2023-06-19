const cron = require('node-cron');
const {
  getFirstRenderToRun,
  markRenderAsInProgress,
  markRenderAsDone,
  markRenderAsFailed,
  isRenderInProgress,
  cleanRenderingJobs,
} = require('./renders');
const { exec } = require('child_process');

const dotenv = require('dotenv');
dotenv.config();

const cronSchedule = '* * * * *';
// eslint-disable-next-line no-undef
const outputDir = process.env.OUTPUT_DIR; // '/var/www/strava-resume/public/renders'

const renderJob = async function () {
  if (await isRenderInProgress()) {
    console.log('render already in progress');
    return;
  }

  const render = await getFirstRenderToRun();
  if (!render) {
    return;
  }

  console.log(`Render ${render.id} with token ${render.token} (${render.lang})`);
  await markRenderAsInProgress(render.id);

  const renderProps = {
    token: render.token,
    userId: render.userId,
    lang: render.lang,
  };

  const cmd = `cd .. && npm run render -- StravaInMotion ${outputDir}/render-${render.id}.mp4 --props='${JSON.stringify(
    renderProps,
  )}'`;
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
};

cleanRenderingJobs()
  .then(() => {
    cron.schedule(cronSchedule, renderJob);
    console.log(`Cronjob is started (${cronSchedule})`);
  })
  .catch(console.error);
