import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NotificationService } from '../../../core/services/notification.service';
import { Observable } from 'rxjs';

interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="notification$ | async as notification" 
         class="fixed top-4 right-4 z-[100] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
         [ngClass]="{
           'bg-green-500': notification.type === 'success',
           'bg-red-500': notification.type === 'error'
         }">
      {{ notification.message }}
    </div>
  `,
  standalone: true,
  imports: [CommonModule] 
})
export class NotificationComponent {
  notification$: Observable<Notification | null>;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.notification$;
  }
}
