import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-full-page',
  imports: [ToolbarComponent, RouterModule],
  templateUrl: './full-page.component.html',
})
export class FullPageComponent {}
