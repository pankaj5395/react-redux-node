import User from '../models/user';
import { setUserInfo, getRole } from '../services/helpers';
//= =======================================
// User Routes
//= =======================================
exports.setQueue = async (req, res, next) => {
    await queue.publish('my-queue1',{name:'pankaj'})
    return res.status(200).json({ data: true });
};

exports.getQueue = async(req ,res, ext) =>{
  let data =  await queue.handleQueue('my-queue1', message =>{
    console.log(message);
  })
  res.status(200).json({ data: data });
} 