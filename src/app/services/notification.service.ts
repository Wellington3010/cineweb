import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationAlert } from '../models/NotificationAlert';
import { NotificationType } from '../enum/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificacaoSubject: Subject<NotificationAlert> = new Subject<NotificationAlert>();

  private sendMessage(notification: NotificationAlert) {
    this.notificacaoSubject.next(notification)
  }

  constructor() { }

  public success(message: string) {
    this.sendMessage({ type: NotificationType.Success, message: message  })
  }

  public danger(message: string) {
    this.sendMessage({ type: NotificationType.Danger, message: message  })
  }

  public warning(message: string) {
    this.sendMessage({ type: NotificationType.Warning, message: message  })
  }
}
