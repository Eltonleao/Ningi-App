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


  async init(){
  }


  async setNotificationsTime(hour, minute): Promise<any>{
    const loading = await this.loadingCtrl.create({
      message: "saving..."
    });
    await loading.present();
    await this.localNotifications.schedule({
      id: 1,
      smallIcon: 'res://icon',
      // icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      title: 'Oi, gastou dinheirinho hoje?',
      trigger: {
        count: 30,
        every: {
          hour: hour,
          minute: minute
        },
      }
    });

    var date = new Date();
    date.setTime(0);
    date.setHours(hour);
    date.setMinutes(minute);
    this.storage.set('notifications', date).then(()=>{
      loading.dismiss();
      return true;
    });
  }

}
