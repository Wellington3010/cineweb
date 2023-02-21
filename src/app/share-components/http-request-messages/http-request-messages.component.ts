import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/NotificationType';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-http-request-messages',
  templateUrl: './http-request-messages.component.html',
  styleUrls: ['./http-request-messages.component.scss'],
  animations:[
    trigger('myTrigger', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('0.5s', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('2s', style({opacity: 0}))
      ])
    ]),
  ]
})
export class HttpRequestMessagesComponent implements OnInit {
  success: boolean = false;
  danger: boolean = false;
  warning: boolean = false;
  notificationMessage!: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notificacaoSubject.subscribe(message => {
      switch(message.type) {
        case NotificationType.Success:
          this.successToast(message.message);
          break;
        case NotificationType.Danger:
          this.dangerToast(message.message);
          break;
        case NotificationType.Warning:
          this.warningToast(message.message);
          break;
        default:
          this.successToast(message.message);
          break;
      }
    });
  }

  successToast(message: string) {
    this.notificationMessage = message;
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  dangerToast(message: string) {
    this.notificationMessage = message;
    this.danger = true;

    setTimeout(() => {
      this.danger = false;
    }, 5000);
  }

  warningToast(message: string) {
    this.notificationMessage = message;
    this.warning = true;

    setTimeout(() => {
      this.warning = false;
    }, 5000);
  }
}
