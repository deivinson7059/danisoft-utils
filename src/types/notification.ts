export interface WhatsappLocationNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  location: WhatsappLocationBody;
}
export interface WhatsappLocationBody {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
}

export interface WhatsappLocationRequest {
  to: string;
  latitude: string;
  longitude: string;
  name: string;
  address: string;
}

export interface WhatsappDocumentNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  document: WhatsappDocumentBody;
}
export interface WhatsappDocumentBody {
  link: string;
  caption: string;
}

export interface WhatsappDocumentRequest {
  to: string;
  link: string;
  caption: string;
}

export interface WhatsappStickerNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  sticker: WhatsappStickerBody;
}
export interface WhatsappStickerBody {
  link: string;
}
export interface WhatsappStickerRequest {
  to: string;
  link: string;
}

export interface WhatsappAudioNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  audio: WhatsappAudioBody;
}
export interface WhatsappAudioBody {
  link: string;
}
export interface WhatsappAudioRequest {
  to: string;
  link: string;
}
export interface WhatsappImageNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  image: WhatsappImageBody;
}
export interface WhatsappImageBody {
  link: string;
}

export interface WhatsappImageRequest {
  to: string;
  link: string;
}
export interface WhatsappContactNotification {
  messaging_product: string;
  to: string;
  type: string;
  contacts: WhatsappContactBody;
}
export interface WhatsappContactBody {
  addresses: addresses[];
  birthday: string;
  emails: emails[];
  name: name;
  org: org;
  phones: phones[];
  urls: urls[];
}

export interface addresses {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  country_code: string;
  type: 'HOME' | 'WORK';
}
export interface emails {
  email: string;
  type: 'HOME' | 'WORK';
}
export interface name {
  formatted_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  prefix: string;
}
export interface org {
  company: string;
  department: string;
  title: string;
}
export interface phones {
  phone: string;
  wa_id: string;
  type: 'HOME' | 'WORK';
}
export interface urls {
  url: string;
  type: 'HOME' | 'WORK';
}

export interface WhatsappContactRequest {
  to: string;
  addresses: addresses[];
  birthday: string;
  emails: emails[];
  name: name;
  org: org;
  phones: phones[];
  urls: urls[];
}

export interface WhatsappVideoNotification {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  video: WhatsappVideoBody;
}
export interface WhatsappVideoBody {
  link: string;
  caption: string;
}

export interface WhatsappVideoRequest {
  to: string;
  link: string;
  caption: string;
}
export interface WhatsappMessageNotification {
  messaging_product: string;
  to: string;
  text: WhatsappMessageBody;
}

export interface WhatsappMessageBody {
  body: string;
  preview_url: boolean;
}

export interface WhatsappMessageRequest {
  to: string;
  message: string;
  preview_url: boolean;
}
export interface WhatsappNotification {
  messaging_product: string;
  to: string;
  type: string;
  template: Template;
}

export interface Template {
  name: string;
  language: Language;
  components?: Component[];
}

export interface Component {
  type: string;
  sub_type?: string;
  index?: number;
  parameters: Parameter[];
}

export interface Parameter {
  type: string;
  text: string;
}

export interface Language {
  code: string;
  policy?: string;
}

export interface WhatsappSuccess {
  messaging_product: string;
  contacts: Contact[];
  messages: Message[];
}

export interface Contact {
  input: string;
  wa_id: string;
}

export interface Message {
  id: string;
}

export interface WhatsappError {
  error: waError;
}

export interface waError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
  error_data?: ErrorData;
  error_subcode?: number;
}

export interface ErrorData {
  messaging_product: string;
  details: string;
}

export interface apiResponse {
  error: boolean;
  data: WhatsappSuccess | WhatsappError | any;
}

export interface AxiosError {
  error: {
    response: {
      data: string | any;
    };
  };
}
