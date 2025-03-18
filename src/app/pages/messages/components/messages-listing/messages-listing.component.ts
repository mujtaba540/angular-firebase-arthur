import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../ui-components/button/button.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessagesDialogComponent } from '../messages-dialog/messages-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { IMessage } from '../../../../shared/interfaces/IMessage.interface';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, SlicePipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../../shared/interfaces/AppState.interface';
import {
  selectIsLoading,
  selectError,
  selectMessage,
} from '../../store/reducers';
import * as MessageActions from '../../store/actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableSkeletonComponent } from '../../../../ui-components/table-skeleton/table-skeleton.component';

@Component({
  selector: 'app-messages-listing',
  imports: [
    ButtonComponent,
    MatTableModule,
    MatSortModule,
    DatePipe,
    AsyncPipe,
    TableSkeletonComponent,
    SlicePipe,
  ],
  templateUrl: './messages-listing.component.html',
  styleUrl: './messages-listing.component.scss',
})
export class MessagesListingComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private store = inject(Store<AppStateInterface>);
  private snakBar = inject(MatSnackBar);

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  message$!: Observable<IMessage[]>;

  messagesList!: IMessage[];
  isLoading!: boolean;

  displayedColumns: string[] = ['id', 'email', 'message', 'createdAt'];
  dataSource = new MatTableDataSource<IMessage>([]);

  ngOnInit(): void {
    this.store.dispatch(MessageActions.getMessages());

    this.store.pipe(select(selectMessage)).subscribe({
      next: (res) => {
        this.dataSource.data = [...res].sort(
          (first, sec) =>
            new Date(sec.createdAt).getTime() -
            new Date(first.createdAt).getTime()
        );
      },
    });
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  openMessageModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    const dialogRef = this.dialog.open(MessagesDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res?.success) {
          this.snakBar.open('Message created successfully', 'Undo', {
            duration: 3000,
          });
        }
      },
    });
  }
}
