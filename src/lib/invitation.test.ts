import { describe, expect, test } from 'bun:test';
import { invitation, targetTime, countdownParts } from './invitation';
describe('engagement details', () => {
  test('confirmed couple', () => { expect(invitation.groom).toBe('Khaliq'); expect(invitation.bride).toBe('Noor ul Ain'); });
  test('requested initials', () => { expect(invitation.monogram).toBe('N & K'); });
  test('18 October after Maghrib at 6:30 PM Karachi', () => { expect(new Date(targetTime).toISOString()).toBe('2026-10-18T13:30:00.000Z'); });
  test('countdown uses the engagement date', () => { expect(countdownParts(Date.parse('2026-10-17T12:00:00Z'))).toEqual({days: 1, hours: 1, minutes: 30, seconds: 0}); });
  test('countdown stops at zero after the engagement', () => { expect(countdownParts(targetTime + 1000)).toEqual({days: 0, hours: 0, minutes: 0, seconds: 0}); });
  test('requested venue', () => { expect(invitation.address).toBe('LD 128, P&T Society, Korangi, Karachi'); });
});
