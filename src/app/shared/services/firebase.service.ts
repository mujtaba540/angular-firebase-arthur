import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage.interface';
import { IError } from '../interfaces/IError.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  messagesCollection = collection(this.firestore, 'messages');
  private snakBar = inject(MatSnackBar);

  getAllMessages(): Observable<IMessage[]> {
    return collectionData(this.messagesCollection, {
      idField: 'id',
    }) as Observable<IMessage[]>;
  }

  postMessages(payload: IMessage): Observable<IMessage | IError> {
    return from(
      addDoc(this.messagesCollection, payload)
        .then((res) => {
          return { ...payload, id: res.id };
        })
        .catch((err) => {
          this.snakBar.open(err.message, 'Undo', {
            duration: 3000,
          });
          return { message: err.message };
        })
    );
  }
}
