import React from 'react';

import { icons } from 'data';
import { MenuItem } from 'components/MenuItem';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectFilters, actions } from 'redux/annotations_reducer';

import './menu.css';

const FilterMenu = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const onClickIcon = (name: string) => {
    if (filters.includes(name)) {
      dispatch(actions.removeFilter(name));
    } else {
      dispatch(actions.addFilter(name));
    }
  };

  return (
    <div className="filter-menu">
      <div className="filter-menu-items">
        <div className="filter-title">Filters</div>
        {icons.map((icon, index) => (
          <MenuItem
            key={icon.name}
            icon={icon}
            selected={filters.includes(icon.name)}
            onClick={() => onClickIcon(icon.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterMenu;
