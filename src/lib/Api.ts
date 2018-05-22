import firebase from "firebase";
import { FireBaseSettings, TwilioSettings } from "../AppConfig";

export function Initialize() {
  firebase.initializeApp(FireBaseSettings);
  firebase.auth().languageCode = "en";
}

export async function SendCode(phoneNumber: string) {

  const result = await fetch(`https://us-central1-kindnessprojectapp.cloudfunctions.net/sendCode?phoneNumber=${phoneNumber}`);

  if (result && result.status == 200) {
    var data = await result.json();

    if (data) {

      const code = data.code;

      //TODO: Send code from firebase not locally once billing is setup.
      const to = `+${phoneNumber.startsWith("1") ? phoneNumber : "1" + phoneNumber}`;
      const from = "+12083149836";
      const body = `Your code is ${code}`;
      const reqUrl = `https://api.twilio.com/2010-04-01/Accounts/${TwilioSettings.sid}/Messages.json`;
      console.log(`Url: ${reqUrl}`);

      const reqBody = new FormData();
      reqBody.append("To", to);
      reqBody.append("From", from);
      reqBody.append("Body", body);

      try {
        const twilResult = await fetch(reqUrl, {
          method: "POST",
          body: reqBody,
          headers: {
            Authorization: `Basic ${Base64.btoa(`${TwilioSettings.sid}:${TwilioSettings.token}`)}`,
            "Content-Type": "multipart/form-data"
          }
        });

        if (twilResult) {
          console.log(twilResult);
        }
      } catch {
        return null;
      }

      return code;
    }
  }

  return null; //-- ERROR
}

export async function VerifyCode(phoneNumber: string, code: string) {
  try {
    const result = await fetch(`https://us-central1-kindnessprojectapp.cloudfunctions.net/verifyCode?phoneNumber=${phoneNumber}&code=${code}`);

    console.log(result);

    if (result && result.status == 200) {
      const data = await result.json();

      if (data && data.token) {
        const user = await firebase.auth().signInWithCustomToken(data.token);
        if(user && user.user) {
          return user.user as IFirebaseUser;
        }
      }
    }
  } catch (er) {
    console.log(er);
  }

  return null;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input: string = '') => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3 / 4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: (input: string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};