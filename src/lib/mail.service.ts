import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  IMailOptions,
  MailServiceResponse,
  SMTPTransportOptions,
} from '../types/mail';
import { greenBright, redBright } from './utils';

/**
 * @description Send an email
 *
 * @param {SMTPTransport.Options} configTransporter - Configuration for the transporter
 */
export class MailService {
  public configTransporter: SMTPTransport.Options | SMTPTransportOptions;
  private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  public constructor(
    configTransporter: SMTPTransportOptions | SMTPTransport.Options
  ) {
    this.configTransporter = configTransporter;
    this.transport = nodemailer.createTransport(configTransporter);
    this.verifyTransport();
  }

  public async send(_mail: IMailOptions): Promise<MailServiceResponse> {
    let _info: MailServiceResponse;
    try {
      this.transport.sendMail({
        from:
          _mail.from !== undefined
            ? _mail.from
            : '"Woomi®" <facturacion@pgfacture.com>',
        to: _mail.to,
        subject: _mail.subject,
        html: _mail.html,
        attachments: _mail.attachments,
      });
      _info = {
        status: true,
        message: 'Email correctamente enviado a ' + _mail.to,
        Error: null,
      };
    } catch (e) {
      console.log(e);
      _info = {
        status: false,
        message: 'Error al enviar el email',
        Error: e,
      };
    }
    return _info;
  }

  private verifyTransport(): void {
    this.transport
      .verify()
      .then(() => {
        console.log('==================NODEMAILER CONFIG====================');
        greenBright('STATUS: ', 'ONLINE');
        greenBright(`MESSAGE: `, `MAILER CONNECT!!`);
        console.log('================== ** ====================');
      })
      .catch((error: any) => {
        console.log('==================NODEMAILER CONFIG====================');
        redBright('STATUS: ', 'OFFLINE');
        redBright(`MESSAGE: `, `${error}`);
        console.log('================== ** ====================');
      });
  }
}
