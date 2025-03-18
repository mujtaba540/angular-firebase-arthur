import { createAction, props } from '@ngrx/store';
import { IMessage } from '../../../shared/interfaces/IMessage.interface';

export const getMessages = createAction('[Messages] Get Messages');
export const getMessagesSuccess = createAction(
  '[Messages] Get Messages success',
  props<{ messages: IMessage[] }>()
);
export const getMessagesFailure = createAction(
  '[Messages] Get Messages failure',
  props<{ error: string }>()
);

export const postMessages = createAction(
  '[Messages] Post Messages',
  props<{ message: IMessage }>()
);
export const postMessagesSuccess = createAction(
  '[Messages] Post Messages success',
  props<{ messages: IMessage }>()
);
export const postMessagesFailure = createAction(
  '[Messages] Post Messages failure',
  props<{ error: string }>()
);
