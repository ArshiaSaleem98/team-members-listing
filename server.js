const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const teamRoutes = require('./routes/teamsRoutes');
const memberRoutes = require('./routes/membersRoutes');

app.use('/teams', teamRoutes);
app.use('/members', memberRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
