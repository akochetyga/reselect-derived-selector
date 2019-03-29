# reselect-derived-selector

This helper allows to build a tree of dependant selectors, that require access to the global state and component properties.

Basic usage:
```javascript
const dataSelectors = {
  filteredData: (state, options) => state.data.filter((item) => item.type === options.itemType),
  fullData: (state) => state.data,
};

const listTypeSelector = (state) => state.listType; // e.g. 'filteredData' or 'fullData'

const myAwesomeSelector = createDerivedSelector(
  [listTypeSelector],
  (state, options, listType) => dataSelectors[listType](state, options),
);
```

Hardcore usage:

```javascript
const dataSelector = (state) => state.data;
const activeTypeFilterSelector = (state, options) => options.typeFilter || state.activeTypeFilter;

const dataSelectors = {
  filteredData: createSelector(
    [dataSelector, activeTypeFilterSelector],
    (data, typeFilter) => data.filter((item) => item.type === typeFilter)),
  fullData: createSelector(
    [dataSelector],
    (data) => data,
  ),
};

const listTypeSelector = (state) => state.listType; // e.g. 'filteredData' or 'fullData'

const myAwesomeSelector = createDerivedSelector(
  [dataSelector], // let's verify if data is changed
  createDerivedSelector(
    [activeTypeFilterSelector], // super check for active type filter changes...
    createDerivedSelector(
      [listTypeSelector], // did current list type update?
      (state, options, listType) => dataSelectors[listType](state, options),
    ),
  ),
);
```
