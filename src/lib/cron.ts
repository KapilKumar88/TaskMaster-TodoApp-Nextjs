const apiBaseURL = process.env.API_BASE_URL;
const cronSecret = process.env.CRON_JOB_SECRET;
let isRunning = false;

setInterval(() => {
  if (!isRunning) {
    isRunning = true;
    console.info('Running cron job');
    fetch(`${apiBaseURL}/cron`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: cronSecret as string,
      },
    })
      .then(() => {
        console.info('Cron job completed');
        isRunning = false;
      })
      .catch((err) => {
        console.error(err?.message ?? 'error in cron job');
        isRunning = false;
      });
  }
}, 5000);
