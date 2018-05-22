
interface IStore {

  diaries: IDiary[];
}

interface IDiary {
  /**
   * In IsoString format
   */
  date?: string;
  title?: string;
  body?: string;
  isGoalOfTheDay: boolean;
  id: string;
  authorId: string;
}

interface RNCalendar {
  /**
   * day of month (1-31)
   */
  day: 1,
  /**
   * month of year (1-12)
   */
  month: 1,
  year: number, 
  /**
   *  UTC timestamp representing 00:00 AM of this date
   */
  timestamp: number,
  /**
   *date formatted as 'YYYY-MM-DD' string 
   */
  dateString: string;
}


interface IFirebaseUser {
  apiKey:          string;
  appName:         string;
  authDomain:      string;
  createdAt:       string;
  displayName:     null;
  email:           null;
  emailVerified:   boolean;
  isAnonymous:     boolean;
  lastLoginAt:     string;
  phoneNumber:     string;
  photoURL:        null;
  providerData:    FireBaseProviderDatum[];
  redirectEventId: null;
  stsTokenManager: FireBaseStsTokenManager;
  uid:             string;
}

interface FireBaseProviderDatum {
  displayName: null;
  email:       null;
  phoneNumber: string;
  photoURL:    null;
  providerId:  string;
  uid:         string;
}

interface FireBaseStsTokenManager {
  accessToken:    string;
  apiKey:         string;
  expirationTime: number;
  refreshToken:   string;
}
