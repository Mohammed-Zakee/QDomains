const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, default: 'individual' },
  businessName: { type: String },
  phone: { type: String },
  country: { type: String },
  role: { type: String, default: 'user' } // 'user', 'admin', 'service'
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
