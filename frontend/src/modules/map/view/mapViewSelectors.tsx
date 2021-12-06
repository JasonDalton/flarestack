import { createSelector } from 'reselect';

const selectRaw = (state) => state.map.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const mapViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default mapViewSelectors;
