const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());


app.post('/save', (req, res) => {
  const data = req.body;


  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: 'No data provided' });
  }


  const dataString = JSON.stringify(data);


  const filePath = path.join(__dirname, 'data.txt');
  fs.appendFile(filePath, dataString + '\n', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Failed to save data' });
    }

    console.log('Data appended to data.txt');
    res.status(200).json({ message: 'Data saved successfully'});
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});