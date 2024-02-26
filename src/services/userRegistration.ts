import { db } from '../db/mainDb';
import type { IReqRegPlayer } from '../models/ClientRequests';

const registerUser = (
  reqData: IReqRegPlayer,
  socketId: number,
): Record<string, unknown> => {
  const user = db.users.getUserByName(reqData.data.name);
  let userIndex: number;
  let isError: boolean;
  let errorText: string;

  if (!user) {
    userIndex = socketId;
    if (!/^[a-zA-Z-]+$/.test(reqData.data.name)) {
      isError = true;
      errorText = 'Name must contain only letters';
    } else {
      db.users.addUser({
        index: socketId,
        name: reqData.data.name,
        password: reqData.data.password,
        wins: 0,
      });
      userIndex = socketId;
      isError = false;
      errorText = '';
    }
  } else {
    userIndex = socketId;
    if (user.password === reqData.data.password) {
      isError = false;
      errorText = '';
      user.index = socketId;
      db.users.updateIndex(user.index, socketId);
    } else {
      isError = true;
      errorText = 'Wrong password';
    }
  }
  return {
    type: 'reg',
    data: JSON.stringify({
      name: reqData.data.name,
      index: userIndex,
      error: isError,
      errorText,
    }),
    id: 0,
  };
};

export { registerUser };
