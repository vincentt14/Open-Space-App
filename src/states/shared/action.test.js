// shared action test

// - asyncPopulateUserAndTalks thunk
//  - should dispatch action correctly when data fetching success
//  - should dispatch action and call correctly when data fetching failed

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { recieveTalksActionCreator } from '../talks/action';
import { recieveUsersActionCreator } from '../users/action';
import asyncPopulateUsersAndTalks from './action';

const fakeTalkResponse = [
  {
    id: 'talk-1',
    text: 'Talk Test 1',
    user: 'user-1',
    replyTo: '',
    likes: [],
    createdAt: '2022-09-22T10:06:55.588Z',
  },
];

const fakeUserResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUserAndTalks thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllTalks = api._getAllTalks;
  });

  // delete backup
  delete api._getAllUsers;
  delete api._getAllTalks;

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUserResponse);
    api.getAllTalks = () => Promise.resolve(fakeTalkResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersAndTalks()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(recieveUsersActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(recieveTalksActionCreator(fakeTalkResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock allert
    window.alert = jest.fn();

    // action
    await asyncPopulateUsersAndTalks()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
