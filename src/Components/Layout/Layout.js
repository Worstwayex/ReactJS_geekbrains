import React from 'react';
import './styles/Layout.css';
import MessageField from '../Messages/MessageField';
import ChatList from '../ChatList/ChatList'
import Header from '../Header/Header'
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import {profileLoading} from '../../Store/actions/profileActions'
import CircularProgress from '@material-ui/core/CircularProgress';
class Layout extends React.Component {
  componentDidMount(){
    this.props.profileLoading()
  }
  render() {
      if (this.props.isLoading) {
    return <CircularProgress />
    }
    else 
    return (
      <div>
        <Header chatId = {this.props.chatId}/>
        <div className={"Layout-chat"}>
          <ChatList chatId ={this.props.chatId} />
        </div>
      </div>
    );
  };
}
const mapStateToProps = ({ profileReducer }) => ({
  profile: profileReducer.profile,
  isLoading: profileReducer.isLoading
});
const mapDispatchToProps = dispatch => bindActionCreators({profileLoading}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
// export default Layout;
