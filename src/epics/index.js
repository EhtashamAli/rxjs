  
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/observable/interval';
import 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import { EventEmitter } from 'events';


const temperature = new EventEmitter();
const airPressure = new EventEmitter();
const humidity = new EventEmitter();

/* eslint-disable no-nested-ternary */

function emitEvent(emitter, emitterName) {
  const randomDelay = Math.floor(Math.random() * 1000);
  setTimeout(
    emitterToEmit => {
      const maxValue =
        emitterName === 'temperature'
          ? 40
          : emitterName === 'airPressure'
            ? 770
            : 100;
      const minValue =
        emitterName === 'temperature'
          ? 0
          : emitterName === 'airPressure'
            ? 740
            : 0;

      const randomNum = parseFloat(
        Math.min(
          minValue + Math.random() * (maxValue - minValue),
          maxValue,
        ).toFixed(0),
      );

      emitterToEmit.emit('data', randomNum);
      emitEvent(emitterToEmit, emitterName);
    },
    randomDelay > 980
      ? Math.floor(Math.random() * 5000)
      : Math.floor(Math.random() * 100) + 100,
    emitter,
  );
}

function initEmitters() {
  emitEvent(temperature, 'temperature');
  emitEvent(airPressure, 'airPressure');
  emitEvent(humidity, 'humidity');
}

export function monitorOn() {
  return { type: 'SWITCH_ON' };
}

export function monitorOff() {
  return { type: 'SWITCH_OFF' };
}

export const Action = (type, payload) => ({
  type,
  payload,
});

export const displayEpic = action$ => {
  initEmitters();
  const display = {
    temperature: {
      value: null,
      time: null,
    },
    airPressure: {
      value: null,
      time: null,
    },
    humidity: {
      value: null,
      time: null,
    },
  };
  return action$.ofType('SWITCH_ON').switchMap(() => {
    const temperatureEvents$ = Observable.fromEvent(temperature, 'data')
      .distinctUntilChanged()
      .map(value => ({
        type: 'temperature',
        value,
      }));

    const airPressureEvents$ = Observable.fromEvent(airPressure, 'data')
      .distinctUntilChanged()
      .map(value => ({
        type: 'airPressure',
        value,
      }));

    const humidityEvents$ = Observable.fromEvent(humidity, 'data')
      .distinctUntilChanged()
      .map(value => ({
        type: 'humidity',
        value,
      }));
    let canGo = true;
    const allEvents$ = Observable.merge(
      temperatureEvents$,
      airPressureEvents$,
      humidityEvents$,
    )
      .map(data => {
        const monitor = {};
        const now = new Date();
        Object.keys(display).forEach(key => {
          monitor[key] =
            display[key].time && now.getTime() - display[key].time > 1000
              ? 'N/A'
              : display[key].value;
        });
        display[data.type] = { value: data.value, time: now.getTime() };

        Object.keys(display).forEach(key => {
          if (!display[key].value) {
            canGo = !!display[key].value;
          }
        });
        return monitor;
      })
      .skipWhile(() => canGo)
      .auditTime(100)
      .map(data => Action('CHANGE_DISPLAY', data));

    allEvents$.subscribe();
    return allEvents$;
  });
};