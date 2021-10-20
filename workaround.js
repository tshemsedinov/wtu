'use strict';

const { Worker, isMainThread } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  let wtu = worker.performance.eventLoopUtilization();
  setInterval(() => {
    const current = worker.performance.eventLoopUtilization();
    const delta = worker.performance.eventLoopUtilization(current, wtu);
    console.log(delta.idle, delta.active, delta.utilization);
    wtu = current;
  }, 2000).unref();
} else {
  setInterval(() => {}, 2000).unref();
}

setTimeout(() => {
  console.log('Bye');
  process.exit(0);
}, 20000);
