
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