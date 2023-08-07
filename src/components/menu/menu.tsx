import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectSelectedIcon, actions } from 'redux/annotations_reducer';

import { icons } from 'data';
import { MenuItem } from 'components/MenuItem';

import './menu.css';

const Menu = () => {
  const dispatch = useAppDispatch();

  const selectedIcon = useAppSelector(selectSelectedIcon);

  const onClickIcon = (name: string, path: string) => {
    if (selectedIcon?.name === name) {
      dispatch(actions.setSelectedIcon(undefined));
    } else {
      dispatch(actions.setSelectedIcon({ name, path }));
    }
  };

  return (
    <div className="menu">
      <div className="menu-items">
        {icons.map((icon, index) => (
          <MenuItem
            key={icon.name}
            icon={icon}
            selected={icon.name === selectedIcon?.name}
            onClick={() => onClickIcon(icon.name, icon.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
