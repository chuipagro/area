export class CronGestion {
  timerToCronM(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalMinutes = parseInt(time.slice(1));
    return '0/' + intervalMinutes + ' * * * *';
  }

  timerToCronH(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalHours = parseInt(time.slice(1));
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 2;
    return startminute + ' 0/' + intervalHours + ' * * *';
  }

  timerToCronW(time: String): String {
    const intervalWeeks = parseInt(time.slice(1));
    return '1 0 0 * ' + intervalWeeks;
  }

  tilerToCronD(time: String, timeAtCreation: string, dateAtCreation: string): String
  {
    const intervalDays = parseInt(time.slice(1));
    const starthour = parseInt(timeAtCreation.split(':')[0]);
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 2;
    console.log("intervalDays");
    return startminute + " " + starthour + " *!/" + intervalDays + ' * *';
  }

  timerToCronMonth(time: String, timeAtCreation: string, dateAtCreation: string): String {
    const intervalMonths = parseInt(time.slice(1));
    const startDay = parseInt(dateAtCreation.split('-')[0]);
    const starthour = parseInt(timeAtCreation.split(':')[0]);
    const startminute = parseInt(timeAtCreation.split(':')[1]) + 1;
    return startminute + " " + starthour + " " + startDay + ' *!/' + intervalMonths + ' *';
  }

  timerToCronS(time: String): String {
    const intervalSeconds = parseInt(time.slice(1));
    return '*!/' + intervalSeconds + ' * * * * *';
  }

  timerToCron(time: String, timeAtCreation: string, dateAtCreation: string): string {
    const conversionFunctions = [
      this.timerToCronS,
      this.timerToCronM,
      this.timerToCronH,
      this.timerToCronW,
      this.tilerToCronD,
      this.timerToCronMonth
    ];

    const calls = "SMHWDm";
    const index = calls.indexOf(time[0]);
    if (index === -1) {
      throw new Error('Invalid timer');
    }
    return conversionFunctions[index](time, timeAtCreation, dateAtCreation).toString();
  }
  
  timeToCronExpression(time: string): string {
    const timeAtCreation = new Date().toLocaleTimeString();
    const dateAtCreation = new Date().toLocaleDateString();
    
    const minutes = parseInt(time.split(':')[1]);
    const hours = parseInt(time.split(':')[0]);
    
    return `5 ${minutes} ${hours} * * *`;
  }
  
  everyDayToCronExpression(date: string, hour:string): string {
    const day = parseInt(date);
    return `0 0 ${day} * *`;
  }
  
  preciseDateToCronExpression(date: string): string {
    const day = parseInt(date.split('/')[0]);
    const month = parseInt(date.split('/')[1]);
    const year = parseInt(date.split('/')[2]);
    return `0 0 ${day} ${month} * ${year}`;
  }
}