import { createSelector } from 'reselect';

const selectRaw = (state) => state.aoi.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const aoiViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default aoiViewSelectors;
