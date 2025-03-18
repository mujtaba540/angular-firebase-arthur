import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MESSAGES_UI_ROUTES } from '../../../../shared/constants/ui-routes';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  MESSAGES_ROUTES = MESSAGES_UI_ROUTES;

  naviagateToUrl(route: string = '') {
    this.router.navigate([`./${route}`]);
  }
}
