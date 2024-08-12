const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this for handling CORS

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/SWE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Banner schema and model
const BannerSchema = new mongoose.Schema({
  description: String,
  timer: Number,
  link: String,
  visible: Boolean,
});

const Banner = mongoose.model('Banner', BannerSchema);

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Routes
app.get('/api/bannerData', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banner data:', error);
    res.status(500).send('Error fetching banner data');
  }
});

app.post('/api/addBanner', async (req, res) => {
  try {
    const { description, timer, link, visible } = req.body;

    // Create a new banner
    const newBanner = new Banner({
      description,
      timer,
      link,
      visible,
    });

    await newBanner.save();
    res.send('Banner added successfully!');
  } catch (error) {
    console.error('Error adding banner:', error);
    res.status(500).send('Error adding banner');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
