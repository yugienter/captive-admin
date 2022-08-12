import { useDispatch, useSelector } from 'react-redux';

import { Layout, Popover } from 'antd';
import React from 'react';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import appActions from '@iso/redux/app/actions';
import NotificationPopover from '../../components/Notification';
import { BellIcon } from '../../components/Notification/icon';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const {total: totalNotification} = useSelector(state => state.notification);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>

        <ul className="isoRight" style={{paddingRight: "200px"}}>
          <li>
          <Popover
              placement="bottom"
              title={false}
              content={<NotificationPopover />}
              trigger="click"
              overlayClassName="menu-notification-popover"
            >
              <div>
                <BellIcon isActive={totalNotification.totalUnclicked > 0} />
              </div>
            </Popover>
          </li>
          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
