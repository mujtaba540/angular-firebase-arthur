import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, NgClass, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  matButtonType = input<string>();
  label = input<string>();
  loader = input<boolean>();
  disabled = input<boolean>();
  icon = input<string>();
  onClick = output();

  setBtnType() {
    switch (this.matButtonType()) {
      case 'raised':
        return 'mat-mdc-button mat-mdc-raised-button';
      case 'stroked':
        return 'mdc-button--outlined mat-mdc-outlined-button';
      case 'flat':
        return 'mat-mdc-unelevated-button';
      case 'menu':
        return 'mat-mdc-menu-item mdc-list-item';
      default:
        return '';
    }
  }

  clickAction() {
    this.onClick.emit();
  }
}
