import Promise from 'bluebird';

export default {
  // for this path:
  '/helloworld': {
    // fetch data from some resource:
    handler: () => Promise.resolve([1, 2]),
    // map the reducer name to the data set
    buildInitialState: data => ({ helloReducer: data }),
  },
};
