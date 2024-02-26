import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecService } from './dec.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ngDeclarative';
  showLoder$=this.share.loderAction$;
  constructor(private share:DecService) {}
}
