import React, { useContext } from 'react';
import { Layout, Menu, Dropdown, Avatar, Switch } from 'antd';
import { DownOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { localizationConstants } from 'constants/index';
import { localizationHelpers, userHelpers } from 'helpers';
import { t } from 'helpers/i18n';
import { IRegionItem } from 'interfaces';
import { StoreContext } from 'contexts';
import { useThemeSwitch } from 'hooks/theme';
import sunIcon from 'assets/images/sun.png';
import moonIcon from 'assets/images/moon.png';

const { Header } = Layout;
const { REGIONS } = localizationConstants;
const { getCurrentLanguage, changeLanguage } = localizationHelpers;
const { logout } = userHelpers;

const AppHeader: React.FC<{ onClickSiderIcon: () => void }> = ({
  onClickSiderIcon,
}) => {
  const { currentUser } = useContext(StoreContext);

  const localizationMenu = (
    <Menu>
      {Object.values(REGIONS).map((el: IRegionItem) => (
        <Menu.Item key={el.key} onClick={() => changeLanguage(el.key)}>
          <Avatar src={el.flag} shape="square" />
          <span style={{ marginLeft: 10 }}>{el.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item data-testid="btn-logout" onClick={logout}>
        <LogoutOutlined />
        <span>{t('Logout')}</span>
      </Menu.Item>
    </Menu>
  );

  const currentRegion = REGIONS[getCurrentLanguage()];

  const { isDarkMode, toggleDarkMode } = useThemeSwitch();

  return (
    <Header className="app-header">
      <div className="d-flex align-items-center">
        <MenuOutlined
          data-testid="sider-icon"
          className="app-icon"
          onClick={onClickSiderIcon}
        />
      </div>

      <div>
        <Switch
          data-testid="theme-switch"
          className="theme-switch"
          title={t('SwitchTheme')}
          checked={isDarkMode}
          checkedChildren={
            <img width="16" height="16" src={moonIcon} alt="dark" />
          }
          unCheckedChildren={
            <img width="16" height="16" src={sunIcon} alt="light" />
          }
          onClick={toggleDarkMode}
        />

        <Dropdown overlay={localizationMenu} trigger={['click']}>
          <span className="app-user">
            <Avatar src={currentRegion && currentRegion.flag} shape="square" />
            <span className="label">{currentRegion && currentRegion.name}</span>
            <DownOutlined />
          </span>
        </Dropdown>

        <Dropdown overlay={userMenu} trigger={['click']}>
          <span className="app-user">
            <Avatar src={currentUser.picture} />
            <span className="label">{currentUser.name}</span>
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
