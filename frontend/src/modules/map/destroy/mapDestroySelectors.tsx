import { createSelector } from 'reselect';

const selectRaw = (state) => state.map.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const mapDestroySelectors = {
  selectLoading,
};

export default mapDestroySelectors;
