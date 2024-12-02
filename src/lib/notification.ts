import axios from 'axios';
import {
  apiResponse,
  WhatsappAudioNotification,
  WhatsappContactNotification,
  WhatsappDocumentNotification,
  WhatsappImageNotification,
  WhatsappLocationNotification,
  WhatsappMessageNotification,
  WhatsappStickerNotification,
  WhatsappVideoNotification,
} from '../types/notification';

/**
 * @description call api to send notification
 *
 * @param {string} phone_number_id - Phone number id
 * @param {string} token - Token to send notification
 * @param { WhatsappMessageNotification | WhatsappDocumentNotification | WhatsappStickerNotification | WhatsappAudioNotification | WhatsappImageNotification | WhatsappContactNotification | WhatsappVideoNotification | WhatsappLocationNotification } _data - Data to send notification
 * @returns {Promise<any>}
 */

export const callWhatsappOnlyApi = async (
  phone_number_id: string,
  token: string,
  _data:
    | WhatsappMessageNotification
    | WhatsappDocumentNotification
    | WhatsappStickerNotification
    | WhatsappAudioNotification
    | WhatsappImageNotification
    | WhatsappContactNotification
    | WhatsappVideoNotification
    | WhatsappLocationNotification
): Promise<any> => {
  let response: any;
  let _url = `https://graph.facebook.com/v13.0/${phone_number_id}/messages?access_token=${token}`;

  try {
    response = await axios({
      method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
      url: _url,
      data: _data,
      headers: { 'Content-Type': 'application/json' },
    });

    let resp: apiResponse = {
      error: false,
      data: response.data,
    };
    return resp;
  } catch (error) {
    //console.log(error);
    let resp: apiResponse = {
      error: true,
      data: error,
    };
    return resp;
  }
};
