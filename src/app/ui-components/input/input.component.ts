import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FORM_ERROR_MESSGAES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    KeyValuePipe,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  errorMessages = FORM_ERROR_MESSGAES;

  label = input<string>('');
  type = input<string>('text');
  controlName = input.required<FormControl>();
  placeholder = input<string>('Please enter');
}
