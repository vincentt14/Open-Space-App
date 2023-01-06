import api from '../../utils/api';
import { recieveTalksActionCreator } from '../talks/action';
import { recieveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();

      dispatch(recieveUsersActionCreator(users));
      dispatch(recieveTalksActionCreator(talks));
    } catch (error) {
      alert(error.message);
    }
  };
}

export default asyncPopulateUsersAndTalks;
