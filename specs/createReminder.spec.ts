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
      await expectCountRemindersToBe(1);
    });
  });

  describe('Given I sent an invalid reminder', () => {
    describe('And name is invalid', () => {
      describe('And name is not defined', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          delete command.name;

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'name should not be empty',
            'name must be a string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });

      describe('And name is not a string', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          command.name = true;

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'name must be a string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });

      describe('And name is empty', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          command.name = '';

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'name should not be empty',
          ]);
          await expectCountRemindersToBe(0);
        });
      });
    });

    describe('And time is invalid', () => {
      describe('And time is not defined', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          delete command.time;

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'time should not be empty',
            'time must be a valid ISO 8601 date string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });

      describe('And time is not a string', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          command.time = true;

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'time must be a valid ISO 8601 date string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });

      describe('And time is empty', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          command.time = '';

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'time should not be empty',
            'time must be a valid ISO 8601 date string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });

      describe('And time is not a valid ISO date', () => {
        it('Then I should get an exception event with validation issues', async () => {
          const command = newValidCommand();
          command.time = '24/12/2021 at midnight';

          const response = await emitCommand(command);
          expectBadRequest(response, [
            'time must be a valid ISO 8601 date string',
          ]);
          await expectCountRemindersToBe(0);
        });
      });
    });
  });

  function expectBadRequest(response: any, invalidFields: string[]) {
    expectErrorResponse(response);
    expect(invalidFields).toEqual(response.fields);
  }

  function expectErrorResponse(response: any) {
    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe('error');
    expect(response.message).toEqual(expect.any(String));
  }

  function expectSucessfullResponse(response: any) {
    expect(response).toBeInstanceOf(Object);
    expect(response.status).toBe('success');
  }

  async function expectCountRemindersToBe(count: number) {
    await expect(service.count()).resolves.toBe(count);
  }

  async function emitCommand(command: any) {
    return await client.emit('createReminder', command);
  }

  function newValidCommand(): any {
    return { name: 'test', time: new Date().toISOString() };
  }

  beforeEach(async () => {
    client = testApp.app.get(WsClient);
    service = testApp.app.get(ReminderService);
    await service.removeAll();
  });
  afterAll(() => service.removeAll());
});
