require('./cron');

const express = require('express');
const cors = require('cors');
const { setup, addRender, getRenderById, getRendersByUserId } = require('./renders');

const app = express();
app.use(express.json());

app.listen(3004, () => {
  console.log('Server started on http://localhost:3004/');
  setup();
});

app.get('/api/user/:userId/renders', cors(), async (req, res) => {
  try {
    const renders = await getRendersByUserId(req.params.userId);
    if (!renders) {
      return res.status(404).send();
    }
    res.send(renders).status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.get('/api/render/:id', async (req, res) => {
  try {
    const render = await getRenderById(req.params.id);
    if (!render) {
      return res.status(404).send();
    }
    res.send(render).status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

app.options('/api/render', cors());
app.post('/api/render', cors(), async (req, res) => {
  try {
    const renderId = await addRender({
      userId: req.body.userId,
      token: req.body.token,
    });
    res.send({ renderId }).status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});
