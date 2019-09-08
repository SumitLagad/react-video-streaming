import React from'react';
import { connect } from 'react-redux';
import { signIn,signOut } from '../actions';

class GoogleAuth extends React.Component {


    componentDidMount() {
        window.gapi.load('client:auth2',() => {
            window.gapi.client.init(
                {
                    clientId: 'YOUR_CLIENT_ID',
                    scope : 'email'
                }
            ).then( () => {

                // set google Auth object inside this class
                this.auth = window.gapi.auth2.getAuthInstance();
                
                // when app loads up check the status of user auth from google api
                // and then change the store state accordingly
                this.onAuthChange(this.auth.isSignedIn.get());
                
                // listen the google auth isSignedIn witch return the boolean value
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // get current state boolean flag and call action creator accordingly
    onAuthChange = (isSignedIn) =>  {
        if(isSignedIn) {
            // send user uniq user id from google auth object to this actin creator
            this.props.signIn(this.auth.currentUser.get().getId());
        } else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            ); 
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        );
        
    }
}


const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);