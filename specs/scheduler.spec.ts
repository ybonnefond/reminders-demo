// Allow any in tests, cannot trust user inputs right? ;)
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */

import { WsClient, testApp } from '../test';
import { REMINDER_SERVICE, ReminderService } from '../src/reminder';

describe('scheduler', () => {
  let client: WsClient;
  let service: ReminderService;

  describe('Given I sent a valid reminder', () => {
    it('Then I should be reminded of the event', async () => {
      const HALF_A_SECOND = 0.5;
      const command = newCommandForReminderIn('simple-reminder', HALF_A_SECOND);
      await emitCommand(command);
      await expect(client.waitForEvent('reminder')).resolves.toEqual({
        name: command.name,
      });
    });

    describe('And I send a second reminder far in the future', () => {
      it('Then I should be reminded of only one event', async () => {
        const A_DAY = 86_400; // 24h * 60min * 60s
        await emitReminder('farevent.next-day', A_DAY);

        const HALF_SECOND = 0.5;
        await emitReminder('farevent.half-sec', HALF_SECOND);

        await expect(client.waitForEvent('reminder')).resolves.toEqual({
          name: expect.stringMatching('farevent.half-sec'),
        });

        await expect(service.count()).resolves.toBe(1);
      });
    });
  });

  async function emitReminder(name: string, sec: number) {
    const nextDayCommand = newCommandForReminderIn(name, sec);
    const nextDayReminderResponse = await emitCommand(nextDayCommand);
    expectSucessfullResponse(nextDayReminderResponse);
  }

  async function emitCommand(command: any) {
    return await client.emit('command', command);
  }

  function expectSucessfullResponse(response: any) {
    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe('success');
  }

  function newCommandForReminderIn(name: string, seconds = 0): any {
    const time = new Date(Date.now() + seconds * 1000).toISOString();

    return {
      type: 'createReminder',
      name: `scheduler.${name}`,
      time,
    };
  }

  beforeEach(() => {
    client = testApp.app.get(WsClient);
    service = testApp.app.get(REMINDER_SERVICE);
    return service.removeAll();
  });
  afterAll(() => service.removeAll());
});
