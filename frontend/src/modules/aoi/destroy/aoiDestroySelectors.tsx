import { createSelector } from 'reselect';

const selectRaw = (state) => state.aoi.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const aoiDestroySelectors = {
  selectLoading,
};

export default aoiDestroySelectors;
