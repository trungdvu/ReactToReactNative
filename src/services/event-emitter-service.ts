import { EventEmitterName } from 'consts';
import { logd, toJSONStr } from 'shared';

const EventEmitter = require('eventemitter3');

const eventEmitter = new EventEmitter();
const TAG = 'EventEmitterService';

/**
 * The same NSNotificationCenter in IOS
 * 1. Subscribe an event
 *    EventEmitterServices.on(EVENTS.name, (data) => {})
 * 2. Unsubscribe an event
 *    EventEmitterServices.removeListener(EVENTS.name);
 * 3. Send an event
 *   EventEmitterServices.emit(EVENTS.name, {data: 'hello'})
 */
export class EventEmitterService {
  static subscribe(
    eventName: EventEmitterName,
    callback: (data?: any) => void
  ): void {
    logd(TAG, `subscribe: ${eventName}`);
    eventEmitter.on(eventName, callback);
  }

  static unsubscribe(eventName: EventEmitterName): void {
    logd(TAG, `unsubscribe: ${eventName}`);
    eventEmitter.removeListener(eventName);
  }

  static send(eventName: EventEmitterName, data?: any): void {
    logd(TAG, `send ${eventName}: ${toJSONStr(data)}`);
    eventEmitter.emit(eventName, data);
  }
}
