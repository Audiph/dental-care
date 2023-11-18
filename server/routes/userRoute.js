import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
