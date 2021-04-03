// Allow any in tests, cannot trust user inputs right? ;)
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */

import { WsClient, testApp } from '../test';
import { REMINDER_SERVICE, ReminderService } from '../src/reminder';

describe('createReminder', () => {
  let client: WsClient;
  let service: ReminderService;

  describe('Given I sent a valid reminder', () => {
    it('Then i should be reminded of the event', async () => {
      const command = newValidCommand();
      command.time = new Date(Date.now() + 500);
      await emitCommand(command);
      await expect(client.waitForEvent('reminder')).resolves.toEqual({
        name: 'test',
      });
    });
  });

  async function emitCommand(command: any) {
    return await client.emit('command', command);
  }

  function newValidCommand(): any {
    return {
      type: 'createReminder',
      name: 'test',
      time: new Date().toISOString(),
    };
  }

  beforeEach(async () => {
    client = testApp.app.get(WsClient);
    service = testApp.app.get(REMINDER_SERVICE);
    await service.removeAll();
  });
  afterAll(() => service.removeAll());
});
