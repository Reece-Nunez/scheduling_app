const express = require('express');
const path = require('path');
const setupDatabase = require('./database');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
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
    const { name, date, time } = req.body;
    const result = await db.run('INSERT INTO events (name, date, time) VALUES (?, ?, ?)', [name, date, time]);
    res.status(201).json({ id: result.lastID, name, date, time });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event' });
  }
});

//Serve static files
app.use(express.static(path.join(__dirname, '../client/dist'), {
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
