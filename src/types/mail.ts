/* import { Attachment } from 'nodemailer/lib/mailer'; */
import { Readable } from 'stream';
import { Url } from 'url';

export interface IMailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[] | any;
}

export interface _IMailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  attachments: Attachments[];
}

export interface MailServiceResponse {
  status: boolean;
  message: string;
  mail?: IMailOptions;
  Error: Error | unknown;
}

export interface Attachments {
  url: string;
}

export interface SMTPTransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  logger: boolean;
  transactionLog: boolean;
}

interface AttachmentLike {
  /** String, Buffer or a Stream contents for the attachmentent */
  content?: string | Buffer | Readable | undefined;
  /** path to a file or an URL (data uris are allowed as well) if you want to stream the file instead of including it (better for larger attachments) */
  path?: string | Url | undefined;
}

export interface Attachment extends AttachmentLike {
  /** filename to be reported as the name of the attached file, use of unicode is allowed. If you do not want to use a filename, set this value as false, otherwise a filename is generated automatically */
  filename?: string | false | undefined;
  /** optional content id for using inline images in HTML message source. Using cid sets the default contentDisposition to 'inline' and moves the attachment into a multipart/related mime node, so use it only if you actually want to use this attachment as an embedded image */
  cid?: string | undefined;
  /** If set and content is string, then encodes the content to a Buffer using the specified encoding. Example values: base64, hex, binary etc. Useful if you want to use binary attachments in a JSON formatted e-mail object */
  encoding?: string | undefined;
  /** optional content type for the attachment, if not set will be derived from the filename property */
  contentType?: string | undefined;
  /** optional transfer encoding for the attachment, if not set it will be derived from the contentType property. Example values: quoted-printable, base64. If it is unset then base64 encoding is used for the attachment. If it is set to false then previous default applies (base64 for most, 7bit for text). */
  contentTransferEncoding?:
    | '7bit'
    | 'base64'
    | 'quoted-printable'
    | false
    | undefined;
  /** optional content disposition type for the attachment, defaults to ‘attachment’ */
  contentDisposition?: 'attachment' | 'inline' | undefined;
  /** is an object of additional headers */
  headers?: Headers | undefined;
  /** an optional value that overrides entire node content in the mime message. If used then all other options set for this node are ignored. */
  raw?: string | Buffer | Readable | AttachmentLike | undefined;
}
