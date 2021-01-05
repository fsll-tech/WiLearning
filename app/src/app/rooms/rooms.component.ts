import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {I18nService} from '../service/i18n.service';
import {LoggerService} from '../service/logger.service';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.component.html',
  styleUrls: ['rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  constructor(
    private alert: AlertController,
    public i18n: I18nService,
    private logger: LoggerService,
  ) {
  }

  ngOnInit() {
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
}
