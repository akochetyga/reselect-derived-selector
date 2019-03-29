const createDerivedSelector = (dependencies, derivedSelector) => {
  const selector = createSelector(dependencies, (...args) => ({
    derivedSelector,
    args,
  }));

  return (state, options) => {
    const result = selector(state, options);

    return result.derivedSelector.apply(null, [state, options, ...result.args]);
  };
};
