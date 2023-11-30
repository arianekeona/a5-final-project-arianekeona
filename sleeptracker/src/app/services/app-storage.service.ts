import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  private _storage: Storage | null = null;

  constructor(private platform:Platform, private storage: Storage) { 
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  public async set(key:string, value:any) {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.set(key, value);
  }

  public async get(key:string):Promise<any> {
    if (!this._storage) {
      await this.init();
    }
    await this.platform.ready();
    let value = await this._storage?.get(key);
    return value;
  }

  public async keys() {
    if (!this._storage) {
      await this.init();
    }
    await this.platform.ready();
    let keys = await this._storage?.keys();
    console.log(keys)
    return keys;
  }
}
