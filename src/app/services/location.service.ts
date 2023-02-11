import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

import { Coordinates } from '../models/coordinate';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private _currentLocation: Coordinates;

  constructor(private httpClient: HttpClient) {
    this.changeCoordinates = this.changeCoordinates.bind(this);
    this.changeFromIP = this.changeFromIP.bind(this);

    this._currentLocation = { latitude: 0, longitude: 0 };
  }

  async getCurrent(): Promise<Coordinates> {
    if (
      this._currentLocation.latitude === 0 &&
      this._currentLocation.longitude === 0
    ) {
      await this.getCoordinates();
    }

    return this._currentLocation;
  }

  async getCoordinates(): Promise<any> {
    const me = this;
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          me.changeCoordinates(pos);
          resolve(pos);
        },
        async (error) => {
          await me.changeFromIP();
          resolve(error);
        }
      );
    });
  }

  /**
   * get location from IP
   */
  private async changeFromIP(): Promise<void> {
    await firstValueFrom(
      this.httpClient.get('https://ipapi.co/json/').pipe(
        map((resp: any) => {
          const coordinates = {
            latitude: resp.latitude,
            longitude: resp.longitude,
          };

          this._currentLocation = coordinates;
        })
      )
    );
  }

  /**
   * change the current website language
   * @param code code of the language
   */
  private changeCoordinates(coordinates: any) {
    this._currentLocation = coordinates.coords;
  }
}
