export function calculateTimeLeft(endDateStr) {
  const endDate = new Date(endDateStr);
  const now = new Date();

  // Tính toán thời gian còn lại (millisecond)
  const timeLeftMs = endDate.getTime() - now.getTime();

  // Nếu thời gian là số âm, trả về "expired"
  if (timeLeftMs < 0) {
    return "Ended";
  }

  // Chuyển đổi thời gian còn lại sang ngày
  const daysLeft = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
  const weeksLeft = Math.floor(daysLeft / 7);
  const monthsLeft = Math.floor(daysLeft / 30);

  // Trả về theo số tháng, tuần hoặc ngày
  if (monthsLeft > 0) {
    return `about ${monthsLeft} month(s) left`;
  } else if (weeksLeft > 0) {
    return `about ${weeksLeft} week(s) left`;
  } else {
    return `about ${daysLeft} day(s) left`;
  }
}
