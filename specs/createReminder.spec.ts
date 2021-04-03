// Allow any in tests, cannot trust user inputs right? ;)
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access */

import { WsClient, testApp } from "../test";
import { ReminderService } from "../src/reminder";

describe('createReminder', () => {
  let client: WsClient;
  let service: ReminderService;

  describe('Given I sent a valid reminder', () => {
    it('Then the reminder should be stored', async () => {
      const command = newValidCommand();
      const response = await emitCommand(command);
      expectSucessfullResponse(response);
      await expectToHaveOneReminderInStore();
    });
  });

  function expectSucessfullResponse(response: any) {
    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe('success');
  }

  async function expectToHaveOneReminderInStore() {
    await expect(service.count()).resolves.toBe(1);
  }

  async function emitCommand(command: any) {
    return await client.emit('createReminder', command);
  }

  function newValidCommand(): any {
    return { name: 'test' };
  }

  beforeEach(async () => {
    client = testApp.app.get(WsClient);
    service = testApp.app.get(ReminderService);
    await service.removeAll();
  });
  afterAll(() => service.removeAll());
});
