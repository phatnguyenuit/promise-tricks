type TaskMaker = () => Promise<void>;

const createTask = (name: string, time: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Done task "${name}" in "${time}" ms.`);
      resolve();
    }),
  );

/**
 * Do parallel tasks
 */
const doParallelTasks = (taskMakers: TaskMaker[]) => {
  return Promise.all(taskMakers.map((taskMaker) => taskMaker()));
};

/**
 * Do sequential tasks
 */
const doSequentialTasks = (taskMakers: TaskMaker[]) => {
  return taskMakers.reduce((prev, taskMaker) => {
    return prev.then(() => taskMaker());
  }, Promise.resolve());
};

console.time('[doSequentialTasks]');
doSequentialTasks([
  () => createTask('Task 1', 5000),
  () => createTask('Task 2', 1000),
])
  .catch((e) => console.error(e))
  .finally(() => {
    console.timeEnd('[doSequentialTasks]');
  });

console.time('[doParallelTasks]');
doParallelTasks([
  () => createTask(`Task 1'`, 5000),
  () => createTask(`Task 2'`, 1000),
])
  .catch((e) => console.error(e))
  .finally(() => {
    console.timeEnd('[doParallelTasks]');
    console.log('\n');
  });

/**
 * The same: the order is preserved.
 * The difference: Execution time
 */
