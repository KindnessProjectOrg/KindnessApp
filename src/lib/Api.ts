import firebase from "firebase";
import { SaveUser } from "./LocalStore";
import { FireBaseSettings, TwilioSettings } from "../AppConfig";
import { btoa } from './Base64';

const fireBaseRootUrl = "https://us-central1-kindnessprojectapp.cloudfunctions.net/";

export function Initialize() {
  firebase.initializeApp(FireBaseSettings);
  firebase.auth().languageCode = "en";
}

async function SendSMS(phoneNumber: string, code: string) {
  //TODO: Send code from firebase not locally once billing is setup.
  const to = `+${phoneNumber.startsWith("1") ? phoneNumber : "1" + phoneNumber}`;
  const body = `Your code is ${code}`;
  const reqUrl = `https://api.twilio.com/2010-04-01/Accounts/${TwilioSettings.sid}/Messages.json`;
  console.log(`Url: ${reqUrl}`);

  const reqBody = new FormData();
  reqBody.append("To", to);
  reqBody.append("From", TwilioSettings.fromPhoneNumber);
  reqBody.append("Body", body);

  try {
    const twilResult = await fetch(reqUrl, {
      method: "POST",
      body: reqBody,
      headers: {
        Authorization: `Basic ${btoa(`${TwilioSettings.sid}:${TwilioSettings.token}`)}`,
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

export async function SendCode(phoneNumber: string) {

  const result = await fetch(`${fireBaseRootUrl}sendCode?phoneNumber=${phoneNumber}`);

  if (result && result.status == 200) {
    var data = await result.json();

    if (data) {
      const code = data.code;
      return await SendSMS(phoneNumber, code);
    }
  }

  return null; //-- ERROR
}

export async function VerifyCode(phoneNumber: string, code: string) {
  try {
    const result = await fetch(`${fireBaseRootUrl}verifyCode?phoneNumber=${phoneNumber}&code=${code}`);

    console.log(result);

    if (result && result.status == 200) {
      const data = await result.json();

      if (data && data.token) {
        const user = await firebase.auth().signInWithCustomToken(data.token);
        if (user && user.user) {

          const loggedInUser = user.user as IFirebaseUser;

          await SaveUser(loggedInUser);

          return loggedInUser;
        }
      }
    }
  } catch (er) {
    console.log(er);
  }

  return null;
}

