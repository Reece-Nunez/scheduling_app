const express = require('express');
const path = require('path');
const setupDatabase = require('./database');
const app = express();
const port = 3000;

app.use(express.json());

let db;

setupDatabase().then(database => {
  db = database;
});

//API route
app.get('/api/events', async (req, res) => {
  try {
    const events = await db.all ('SELECT * FROM events');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.run('INSERT INTO events (name) VALUES (?)', name);
    res.status(201).json({ id: result.lastID, name });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event' });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist/assets'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    } else if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));


//catch-all route for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
