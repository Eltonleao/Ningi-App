import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public localNotifications: LocalNotifications
  ) {
  }



  setNotificationsHour(hour){
    this.localNotifications.schedule({
      title: 'Já registrou seus gastos hoje?',
      vibrate: false,
      trigger: {
        count: 1,
        every: {
          hour: hour,
        }
      }
    });

  }
}
