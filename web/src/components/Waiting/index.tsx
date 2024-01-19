import { Spin } from 'antd';

import S from './styles.module.less';

const Waiting = () => (
  <div className={S.container}>
    <Spin />
  </div>
);

export default Waiting;
