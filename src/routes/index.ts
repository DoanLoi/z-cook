import { lazy } from 'react';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';

import { t } from 'helpers/i18n';

// App pages
const Home = lazy(() => import('containers/Home'));

/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */
const routes = [
  // This is a menu/route which has no children (sub-menu)
  {
    exact: true,
    path: '/',
    name: t('Home'),
    component: Home,
    icon: HomeOutlined,
  },
];

export default routes;
