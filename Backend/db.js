// Connect to MongoDB and create initial data
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SWE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BannerSchema = new mongoose.Schema({
  description: String,
  timer: Number,
  link: String,
  visible: Boolean,
});

const Banner = mongoose.model('Banner', BannerSchema);

const initialBanner = new Banner({
  description: 'Welcome to our website!',
  timer: 120,
  link: 'https://example.com',
  visible: true,
});

initialBanner.save().then(() => mongoose.connection.close());
