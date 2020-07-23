const createTask = (name, time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Done task "${name}" in "${time}" ms.`);
      resolve();
    }),
  );

/**
 * Do parallel tasks
 * @param {(() => Promise<any>)[]} taskMakers
 */
const doParallelTasks = (taskMakers) => {
  return Promise.all(taskMakers.map((taskMaker) => taskMaker()));
};

/**
 * Do sequential tasks
 * @param {(() => Promise<any>)[]} taskMakers
 */
const doSequentialTasks = (taskMakers) => {
  return taskMakers.reduce((prev, taskMaker) => {
    return prev.then(() => taskMaker());
  }, Promise.resolve());
};

console.time('[doSequentialTasks]');
doSequentialTasks([
  () => createTask('Task 1', 5000),
  () => createTask('Task 2', 1000),
]).then(() => {
  console.timeEnd('[doSequentialTasks]');
});

console.time('[doParallelTasks]');
doParallelTasks([
  () => createTask(`Task 1'`, 5000),
  () => createTask(`Task 2'`, 1000),
]).then(() => {
  console.timeEnd('[doParallelTasks]');
  console.log('\n');
});

/**
 * The same: the order is preserved.
 * The difference: Execution time
 */
