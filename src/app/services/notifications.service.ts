import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";




@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationHour: any;
  constructor(
    public localNotifications: LocalNotifications,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.init();
  }


  async init() {
  }


  async setNotificationsTime(): Promise<any> {
    this.localNotifications.clearAll();
    var env = this;


    await this.storage.get('notification').then(async function (time) {

      var notifications = [];

      var date = new Date(time);

      // date.setHours(hour);
      // date.setMinutes(minute);

      for (var i = 1; i <= 31; i++) {

        notifications.push(
          {
            id: i,
            smallIcon: 'res://icon',
            title: 'Oi, gastou dinheirinho hoje?',
            trigger: { at: date }
          }
        )
        date.setDate(date.getDate() + 1);

      }
      const loading = await env.loadingCtrl.create({
        message: "saving..."
      });
      await loading.present();
      console.log(notifications);
      await env.localNotifications.schedule(notifications);
      loading.dismiss();
    })

  }

}
