import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {I18nService} from '../service/i18n.service';
import {LoggerService} from '../service/logger.service';
import {AdminServer} from '../config';
import {WlRoomInfo} from '../defines';
import {WlhttpService} from '../service/wlhttp.service';
import {ProfileService} from '../service/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.component.html',
  styleUrls: ['rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  public rooms: any = [];

  constructor(
    private alert: AlertController,
    public i18n: I18nService,
    private logger: LoggerService,
    private http: WlhttpService,
    private profile: ProfileService,
    public router: Router,
  ) {
  }

  async ngOnInit() {
    this.rooms = await this.http.http.get(`https://${AdminServer.address}/room/list`).toPromise();
  }

  async logout() {
    const alert = await this.alert.create({
      header: this.i18n.lang.confirm,
      message: this.i18n.lang.exitConfirm,

      buttons: [
        {
          text: this.i18n.lang.cancel,
          role: 'cancel',
          handler: (blah) => {
            this.logger.debug('Cancel');
          }
        },
        {
          text: this.i18n.lang.ok,
          handler: async () => {
            location.reload();
            this.logger.debug('Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  gotoRoom(room: any) {
    this.profile.roomId = room.id;
    this.getRoomInfo(room.id);
  }

  getRoomInfo(roomid) {
    const roomDetailUrl = `https://${AdminServer.address}/room/info/${roomid}`;
    this.http.http.get(roomDetailUrl).toPromise().then(roomInfo => {
      this.logger.debug('room info: ', roomInfo);
      this.profile.roomInfo = roomInfo as WlRoomInfo;
      this.router.navigateByUrl('/');
    }).catch(error => {
      this.logger.error(error.error);
    });
  }
}
