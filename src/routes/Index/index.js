import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon, message } from 'antd';
import { Link } from 'dva/router';
import styles from './style.scss';

class Index extends Component {
  sync = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/sync'
    }).then(() => {
      message.success('粉丝数据更新成功');
    });
  }
  render() {
    const sync = this.sync;
    const { loading } = this.props;
    console.info('this.props', this.props);
    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.section} onClick={sync}>
            <div className={styles.sync}><Icon className={loading ? `${styles.loading}` : ''} type="sync" /> 同步用户</div>
          </div>
          <Link to='/send' className={`${styles.section} ${styles.button}`}>
            <Icon type="message" /> 发通知
          </Link>
          <Link to='/send?type=tags' className={`${styles.section} ${styles.button}`}>
            <Icon type="tags" /> 按标签群发
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    users: list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Index);