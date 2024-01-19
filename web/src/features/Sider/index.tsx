import { Avatar, Layout, Menu } from 'antd';
import _ from 'lodash';
import { useMemo } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import S from './styles.module.less';

const Sider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = useMemo(() => {
    const paths = _.compact(location.pathname.split('/'));
    return paths?.[0] ?? '';
  }, [location.pathname]);

  const menuItems = useMemo<any>(() => {
    const items: any = [];
    [
      ['', 'Emotion Detect', AiFillAppstore],
      ['chat', 'Chat Detect', FiUsers],
    ].forEach(([feature, name, Icon]) => {
      const item: any = {
        key: feature as string,
        label: name,
        icon: <Icon />,
      };
      items.push(item);
    });
    return items;
  }, []);

  return (
    <Layout.Sider className={S.container} collapsible breakpoint="xl" collapsedWidth={60}>
      <Menu
        selectable={false}
        items={[
          {
            key: 'app',
            label: 'Emotion Detect',
            icon: <Avatar size="small" src="/logo192.png" />,
          },
        ]}
      />
      <Menu
        className={S.menus}
        onClick={({ key }) => {
          navigate(`/${key}`);
        }}
        selectedKeys={[activeMenu]}
        items={menuItems}
      />
    </Layout.Sider>
  );
};

export default Sider;
