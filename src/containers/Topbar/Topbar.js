import { useDispatch, useSelector } from 'react-redux';

import { Layout, Popover } from 'antd';
import React, { useEffect } from 'react';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import appActions from '@iso/redux/app/actions';
import NotificationPopover from '../../components/Notification';
import { BellIcon } from '../../components/Notification/icon';
import { useAuthenticatedSocket } from '../../hooks/useAuthenticationSocket';
import { useSocketEvent } from 'socket.io-react-hook';
import { changeVisibleNotification, getNotificationTotal } from '../../components/Notification/actions';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [, setSelectedItem] = React.useState('');
  const { socket } = useAuthenticatedSocket();
  const { sendMessage: sendMessageRegister } = useSocketEvent(socket, "register");
  const { lastMessage: eventNotification } = useSocketEvent(socket, "notifications");
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const {total: totalNotification, showNotification} = useSelector(state => state.notification);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const [isNewNotification, setIsNewNotification] = React.useState(totalNotification.totalUnclicked > 0);
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

  const onChangeVisibleNotification = (show) => {
    dispatch(changeVisibleNotification(show));
  }

  const onClickShowNotification = () => {
    setIsNewNotification(false);
    changeVisibleNotification(!showNotification);
  }

  useEffect(() => {
    if (!socket) return;
    dispatch(getNotificationTotal());
    sendMessageRegister({
      userCode: "admin"
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (!eventNotification) return;
    console.log(eventNotification);
    setIsNewNotification(true);
  }, [eventNotification]);

  useEffect(() => {
    if (totalNotification.totalUnclicked > 0) {
      setIsNewNotification(true);
    }
  }, [totalNotification]);

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
              getPopupContainer={trigger => trigger.parentElement}
              trigger="click"
              visible={showNotification}
              onVisibleChange={onChangeVisibleNotification}
              overlayClassName="menu-notification-popover"
            >
              <div onClick={onClickShowNotification}>
                <BellIcon isActive={isNewNotification} />
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
