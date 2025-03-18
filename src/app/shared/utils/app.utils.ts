import { FormControl } from '@angular/forms';

export function getErrorMessage(control: FormControl, label: string) {
  let errorMessage = '';
  const labelText = label ? label : 'Field';
  if (control.hasError('required')) {
    errorMessage = `${labelText} is required`;
  } else if (control.hasError('email')) {
    errorMessage = `Enter a valid email address`;
  }
  return errorMessage;
}
