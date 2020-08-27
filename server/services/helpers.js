import { ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN } from '../constants';

// Set user info from request
export function setUserInfo(request) {
  const getUserInfo = {
    id: request.id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};

export async function getRole(id) {

  let role = await database.Role.findOne({where:{id: id}});

  if(!role)
    return false;

  return id;
  
};
