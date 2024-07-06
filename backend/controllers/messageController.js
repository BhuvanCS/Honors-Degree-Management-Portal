import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  const { sender, recipients, content } = req.body;

  try {
    const message = new Message({ sender, recipients, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender recipients');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
