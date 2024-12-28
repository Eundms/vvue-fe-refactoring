import moment from 'moment';

// D-day 계산하는 함수
export function calculateDays(targetDate: any, currentDate: any, schedule?: any) {
  targetDate = moment(targetDate);
  currentDate = moment(currentDate);
  // 며칠 남았는지
  const daysUntilTargetDate = targetDate.diff(currentDate, 'days');

  // 만약 일정이 오늘이라면
  if (daysUntilTargetDate === 0) {
    return 'D-day';
  } else if (daysUntilTargetDate > 0) {
    return `D-${daysUntilTargetDate}`;
  } else {
    return `${Math.abs(daysUntilTargetDate)}`;
  }
}
