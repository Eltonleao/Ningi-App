import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public storage: Storage,

  ) { }

  checkAndUpdateUserStorage(){
    this.storage.get('')
  }
}
