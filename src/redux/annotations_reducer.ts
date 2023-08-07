import { createSelector, createSlice } from '@reduxjs/toolkit';
import { LngLatLike } from 'mapbox-gl';

import { RootState } from './store';

interface AnnotationState {
  selectedIcon: { name: string; path: string } | undefined;
  filters: Array<string>;
  icons: Array<{
    name: string;
    path: string;
    lat: number;
    lng: number;
  }>;
}

const initialState: AnnotationState = {
  selectedIcon: undefined,
  filters: [],
  icons: [],
};

const annotationsSlice = createSlice({
  name: 'annotations',
  initialState,
  reducers: {
    setSelectedIcon: (state, action) => {
      state.selectedIcon = action.payload;
    },
    addIcon: (state, action) => {
      if (state.selectedIcon) {
        state.icons = [
          ...state.icons,
          { ...action.payload, ...state.selectedIcon },
        ];
      }
    },
    addFilter: (state, action) => {
      state.filters = [...state.filters, action.payload];
    },
    removeFilter: (state, action) => {
      state.filters = state.filters.filter((icon) => icon !== action.payload);
    },
  },
});

export const selectAnnotation = (state: RootState) => state.annotations;

export const selectSelectedIcon = createSelector(
  selectAnnotation,
  (state) => state.selectedIcon
);

export const selectFilters = createSelector(
  selectAnnotation,
  (state) => state.filters
);

export const selectIcons = createSelector(selectAnnotation, (state) =>
  state.filters.length === 0
    ? state.icons
    : state.icons.filter((icon) => state.filters.includes(icon.name))
);

export const { actions } = annotationsSlice;
export default annotationsSlice.reducer;
