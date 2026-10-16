export const invitation = {
  bride: 'Noor ul Ain',
  groom: 'Khaliq',
  brideParent: 'S/O Jameel',
  monogram: 'N & K',
  date: '2026-10-18T18:30:00+05:00',
  day: '18',
  weekday: 'Sunday',
  monthYear: 'October 2026',
  time: '6:30 PM',
  timeNote: 'After Maghrib',
  address: 'LD 128, P&T Society, Korangi, Karachi',
};
export const targetTime = new Date(invitation.date).getTime();
export function countdownParts(now: number) {
  const remaining = Math.max(0, targetTime - now);
  return { days: Math.floor(remaining / 86400000), hours: Math.floor(remaining / 3600000) % 24, minutes: Math.floor(remaining / 60000) % 60, seconds: Math.floor(remaining / 1000) % 60 };
}
export function celebrationColors() {
  const styles = getComputedStyle(document.documentElement);
  return ['--confetti-green', '--confetti-pink', '--confetti-white'].map(token => styles.getPropertyValue(token).trim());
}
