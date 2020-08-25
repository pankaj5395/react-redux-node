import User from '../models/user';
import { setUserInfo, getRole } from '../services/helpers';

//= =======================================
// User Routes
//= =======================================
exports.viewProfile = async (req, res, next) => {
  const userId = req.params.userId;

  if (req.user.id.toString() !== userId) { 
    return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); 
  }
  let user = await database.User.findByPk(userId);
    if(!user){
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn });
};
