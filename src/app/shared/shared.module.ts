import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FormatDatePipe,

  ],
  imports: [
    CommonModule,
    NotificationComponent
  ],
  exports: [
    LoadingSpinnerComponent,
    FormatDatePipe,
    NotificationComponent 
  ]
})
export class SharedModule { }
