import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { usn, password, name, cgpa } = req.body;

  try {
    const userExists = await User.findOne({ usn });

    if (userExists) {
      return res.status(400).json({ message: 'USN already exists' });
    }
    const user = new User({
      usn,
      password: bcrypt.hashSync(password, 8),
      name,
      cgpa,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { usn, password } = req.body;

  try {
    const user = await User.findOne({ usn });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.isAccepted) return res.status(403).json({ message: 'Student Not Accepted yet! Contact Admin for more details.' });

    const token = jwt.sign({ usn: usn, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
