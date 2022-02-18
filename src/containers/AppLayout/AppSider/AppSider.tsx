import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { IRoute } from 'interfaces';
import { commonHooks } from 'hooks';
import logo from 'assets/images/logo.png';

const { Sider, Footer } = Layout;
const { SubMenu } = Menu;
const { useAppMenu } = commonHooks;

interface AppSiderProps {
  filteredNavigation: IRoute[];
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = props => {
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation, collapsed } = props;

  const { selectedKey, openKey } = useAppMenu(filteredNavigation);

  return (
    <Sider
      className={classNames({
        'app-sider': true,
        collapsed,
      })}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      <div className="app-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <Menu
        className="app-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
      >
        {filteredNavigation.map(item => {
          if (!item.icon) return null;
          if (!item.children) {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <item.icon className="app-icon" />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          } else {
            const { children } = item;
            const childs = filteredNavigation.filter(
              child => children.includes(child.path) && !child.children
            );
            return (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <item.icon className="app-icon" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {childs.map(child => {
                  return (
                    <Menu.Item key={child.path}>
                      <Link to={child.path}>{child.name}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </Menu>

      {!collapsed && (
        <Footer className="app-footer">
          Teko Admin Boilerplate © {process.env.REACT_APP_VERSION}
        </Footer>
      )}
    </Sider>
  );
};

export default AppSider;
