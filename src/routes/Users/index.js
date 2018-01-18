import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Avatar } from 'antd';
// import styles from './Users.css';
// import UsersComponent from '../components/Users/Users';
// import MainLayout from '../components/MainLayout/MainLayout';

class Users extends Component {
  render() {
    console.info('this.props', this.props);
    const { users } = this.props;
    const users_el = users && users.map((user) => {
      return (
        <li>{user.nickname}<img width="20" src={user.headimgurl} /></li>
      );
    });
    return (
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={user => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.headimgurl} />}
              title={<a href={`/${user.openid}`}>{user.nickname}</a>}
              description={`备注 ${user.remark || '无'}  关注状态：${user.subscribe}`}
            />
          </List.Item>
        )}
      />
    );
  }
}
// function Users({ location }) {
//   return (
//     <MainLayout location={location}>
//       <div className={styles.normal}>
//         <UsersComponent />
//       </div>
//     </MainLayout>
//   );
// }
function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    users: list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
