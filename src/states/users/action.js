import api from '../../utils/api';

const ActionType = {
  RECIEVE_USERS: 'RECIEVE_USERS',
};

function recieveUsersActionCreator(users) {
  return {
    type: ActionType.RECIEVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ id, name, password }) {
  return async () => {
    try {
      await api.register({ id, name, password });
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, recieveUsersActionCreator, asyncRegisterUser };
