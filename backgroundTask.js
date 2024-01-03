// backgroundTask.js
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { checkRatesAndNotify } from './rateChecker'; // You will create this next

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const result = await checkRatesAndNotify();
  return result ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
});

export const registerBackgroundFetch = async () => {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15, // Requesting to run as often as possible
    stopOnTerminate: false,
    startOnBoot: true,
  });
};

