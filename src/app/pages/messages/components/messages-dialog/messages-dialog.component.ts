import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../ui-components/button/button.component';
import { InputComponent } from '../../../../ui-components/input/input.component';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../../shared/interfaces/AppState.interface';
import * as MessageActions from '../../store/actions';
import { filter, Observable } from 'rxjs';
import { selectError, selectIsLoading } from '../../store/reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    ButtonComponent,
    InputComponent,
    AsyncPipe,
  ],
  templateUrl: './messages-dialog.component.html',
  styleUrl: './messages-dialog.component.scss',
})
export class MessagesDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<MessagesDialogComponent>);
  private store = inject(Store<AppStateInterface>);
  messageForm!: FormGroup;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      message: new FormControl(null, Validators.required),
    });

    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  getFormControl(control: string) {
    return this.messageForm.controls[control] as FormControl;
  }

  closeModal() {
    this.dialogRef.close({ success: false });
  }

  onSubmit() {
    const payload = this.messageForm.getRawValue();
    payload.createdAt = new Date().toISOString();

    this.store.dispatch(MessageActions.postMessages({ message: payload }));
    this.isLoading$.subscribe({
      next: (val) => {
        if (!val) {
          this.dialogRef.close({
            success: true,
          });
        }
      },
    });
  }
}
