import { createFeature, createReducer, on } from '@ngrx/store';
import * as MessageActions from './actions';
import { IMessageState } from '../../../shared/interfaces/IMessage.interface';

export const initialState: IMessageState = {
  isLoading: false,
  message: [],
  error: null,
};

const messageFeature = createFeature({
  name: 'message',
  reducer: createReducer(
    initialState,
    on(MessageActions.getMessages, (state) => ({ ...state, isLoading: true })),
    on(MessageActions.getMessagesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      message: action.messages,
    })),
    on(MessageActions.getMessagesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),

    on(MessageActions.postMessages, (state) => ({ ...state, isLoading: true })),
    on(MessageActions.postMessagesSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      message: [action.messages, ...state.message],
    })),
    on(MessageActions.postMessagesFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))
  ),
});

export const {
  name: messageFeatureKey,
  reducer: messageReducer,
  selectError,
  selectIsLoading,
  selectMessage,
} = messageFeature;
