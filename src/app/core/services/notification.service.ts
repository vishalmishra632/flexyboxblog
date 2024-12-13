import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(notification: Notification) {
    this.notificationSubject.next(notification);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 5000);
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
