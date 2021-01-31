import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import logo from './styles/logo.jpg'
import './styles/Profile.css'

import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

function Profile(props){
    return(
        <div>
            <Header/>
            <Link to="/">
                return to chat
            </Link>
            <div className = "Profile">
                <div className='header profile'>
                    <h2>Profile</h2>
                </div>
                <div className='profile-info'>
                    <div className='group'>
                        <img src = {logo} className = {"avatar"}
                        // width="200" height="200" 
                        />
                        <div style ={{display:'flex'}}>
                        <h4>Username:</h4>
                        <span className = {"spantext"}>
                            {/* {this.props.username} */}
                            {props.profile.username}
                        </span>
                        </div>
                        <div style ={{display:'flex'}}>
                        <h4>React</h4>
                        <span className = {"spantext"}>
                            {/* {this.props.username} */}
                            {props.profile.text}
                        </span>
                        </div>
                    </div> 
                    {/* <button 
                    // onClick={this.signOut}
                    >Sign out</button> */}
                </div>
            </div>
        </div>
    )
} 

const mapStateToProps = ({ profileReducer }) => ({
    profile: profileReducer.profile,
 });
 
 const mapDispatchToProps = dispatch => 
    bindActionCreators({}, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(Profile);