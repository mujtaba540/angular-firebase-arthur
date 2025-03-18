import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as MessageActions from './actions';
import { FirebaseService } from '../../../shared/services/firebase.service';

@Injectable()
export class MessageEffects {
  private firebaseService = inject(FirebaseService);
  private actions$ = inject(Actions);
  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.getMessages),
      mergeMap(() => {
        return this.firebaseService.getAllMessages().pipe(
          map((messages) => MessageActions.getMessagesSuccess({ messages })),
          catchError((error) =>
            of(MessageActions.getMessagesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  postMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.postMessages),
      mergeMap(({ message }) =>
        this.firebaseService.postMessages(message).pipe(
          map((messages: any) =>
            MessageActions.postMessagesSuccess({ messages })
          ),
          catchError((error) =>
            of(MessageActions.postMessagesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
