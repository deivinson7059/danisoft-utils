import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  IMailOptions,
  MailServiceResponse,
  SMTPTransportOptions,
} from '../types/mail';
import { greenBright, redBright } from './console';

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
    this.msmTransport(0, null);
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
    } finally {
      this.finalizar(); // Cierra la conexión SMTP después del intento de envío
    }
    return _info;
  }
  private finalizar(): void {
    if (this.transport) {
      this.transport.close(); // Cierra la conexión SMTP
      this.msmTransport(3, null);
    }
  }

  private verifyTransport(): void {
    this.transport
      .verify()
      .then(() => {
        this.msmTransport(4, null);
      })
      .catch((error: any) => {
        this.msmTransport(2, error);
      });
  }

  private msmTransport(connect: number = 0, error: any): void {
    if (connect === 0) {
      console.log('==================NODEMAILER CONFIG====================');
      greenBright(`STATUS: `, `ONLINE`);
      greenBright(`MESSAGE: `, `MAILER CONNECT!!`);
      greenBright('HOST: ', this.configTransporter.host!);
      greenBright('PORT: ', this.configTransporter.port?.toString()!);
      greenBright('USER: ', this.configTransporter.auth?.user!);
      console.log('================== ** ====================');
    } else if (connect === 1) {
      console.log('==================NODEMAILER CONFIG====================');
      greenBright(`STATUS: `, `ONLINE`);
      greenBright(`MESSAGE: `, `MAILER CONNECT!!`);
      console.log('================== ** ====================');
    } else if (connect === 2) {
      console.log('==================NODEMAILER CONFIG====================');
      redBright('STATUS: ', 'OFFLINE');
      redBright(`MESSAGE: `, `${error}`);
      console.log('================== ** ====================');
    } else if (connect === 3) {
      console.log('==================NODEMAILER CONFIG====================');
      redBright(`STATUS: `, `OFFLINE`);
      redBright(`MESSAGE: `, `MAILER DISCONNECT!!`);
      console.log('================== ** ====================');
    }
  }
}
