import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../ui-components/button/button.component';
import { MESSAGES_UI_ROUTES } from '../../../../shared/constants/ui-routes';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, ButtonComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  private router = inject(Router);
  MESSAGES_ROUTES = MESSAGES_UI_ROUTES;

  naviagateToUrl(route: string = '') {
    this.router.navigate([`./${route}`]);
  }
}
