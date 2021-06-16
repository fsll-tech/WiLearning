/*
 * Copyright (c) 2020 liwei<linewei@gmail.com>
 *
 * This program is free software: you can use, redistribute, and/or modify
 * it under the terms of the GNU Affero General Public License, version 3
 * or later ("AGPL"), as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';
import { WlhttpService } from './wlhttp.service';
import { LoggerService } from './logger.service';
import { AdminServer } from '../config';
import {ProfileService} from './profile.service';
import {WlRoomInfo} from '../defines';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string;
  public isLoggedIn: any = false;

  constructor(
    public router: Router,
    private logger: LoggerService,
    private http: WlhttpService,
    private profile: ProfileService,
  ) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn2');
    if (this.isLoggedIn) {
      this.isLoggedIn = JSON.parse(this.isLoggedIn);
      const oldProfile: any = JSON.parse(localStorage.getItem('profile'));
      this.profile.me.displayName = oldProfile.me.displayName;
      this.profile.me.roler = oldProfile.me.roler;
      this.profile.roomId = oldProfile.roomId;


    } else {
      this.isLoggedIn = false;
    }
  }
  login(userInfo: {username: string, password: string, roomId: string, roler}) {
    const cryptoPasswd = CryptoJs.MD5(userInfo.password).toString().toUpperCase();
    const loginUrl = `${AdminServer.address}/room/login/${userInfo.roomId}/${userInfo.roler}/${userInfo.username}/${cryptoPasswd}`;
    this.logger.debug('loginUrl : %s', loginUrl);

    return this.http.http.get(loginUrl).toPromise();
  }
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn2');
    localStorage.removeItem('profile');
  }
  getRoomInfo(roomid) {
    const roomDetailUrl = `${AdminServer.address}/room/info/${roomid}`;
    this.http.http.get(roomDetailUrl).toPromise().then(roomInfo => {
      this.logger.debug('room info: ', roomInfo);
      this.profile.roomInfo = roomInfo as WlRoomInfo;
      this.router.navigateByUrl(this.redirectUrl);
    }).catch(error => {
      this.logger.error(error.error);
    });
  }
}
