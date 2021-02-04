import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationHour: any;
  constructor(
    public localNotifications: LocalNotifications,
    public storage: Storage
  ) {
    this.init();
  }


  async init(){
  }


  async setNotificationsTime(hour, minute): Promise<any>{
    await this.localNotifications.schedule({
      title: 'Já registrou seus gastos hoje?',
      actions: [{ id: 'yes', title: 'Yes' }],
      vibrate: false,
      trigger: {
        count: 1,
        every: {
          hour: hour,
          minute: minute
        }
      }
    });

    var date = new Date();
    date.setTime(0);
    date.setHours(hour);
    date.setMinutes(minute);
    this.storage.set('notifications', date).then(()=>{
      return true;
    });
  }

}
