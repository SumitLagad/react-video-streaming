import React from 'react';
import { BrowserRouter,Route,Link } from 'react-router-dom';

const RouteOne = () => {
    return(
        <div>
            Route One

            <Link to="/routetwo">page two</Link>
        </div>
    )
};


const RouteTwo = () => {
    return(
        <div>
            Route Two
            <Link to="/">Page One</Link>
        </div>
    )
};



const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={RouteOne} />                
     
                <Route path="/routetwo"  component={RouteTwo} />
            </BrowserRouter>
        </div>
    );

}

export default App;