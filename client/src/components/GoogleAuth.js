import React from'react';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2',() => {
            window.gapi.client.init(
                {
                    clientId: 'YOUR_CLIENT_ID',
                    scope : 'email'
                }
            );
        });
    }

    render(){
        return(
            <div>
                GoogleAuth
            </div>
        );
        
    }
}

export default GoogleAuth;