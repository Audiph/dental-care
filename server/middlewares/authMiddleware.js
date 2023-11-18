import Jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .send({ message: 'Auth failed!', success: false });

      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Error Auth', error, success: false });
  }
};
