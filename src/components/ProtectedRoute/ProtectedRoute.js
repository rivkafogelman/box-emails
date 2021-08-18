import React, { useState, useEffect, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom';
import keys from '../../Config/keys'


function redirectToLogin(routes) {
   
    let isDevOrLocal=window.location.href.includes('dev')?window.location.href.includes('dev'):window.location.href.includes('localhost')?window.location.href.includes('localhost'):null
    let urlAccounts=`https://${isDevOrLocal ? 'dev.':''}accounts.codes`

    window.location.href = routes ?
        `${urlAccounts}/box/login?routes=${routes}` :
        `${urlAccounts}/box/login`;
    return null
}
const ProtectedRoute = ({ component: Component, user, ...rest }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let userName = rest.computedMatch.params.userName;
let jwt = document.cookie && document.cookie.includes(keys.JWT) ? document.cookie.split(";")
.filter(s => s.includes(keys.JWT))[0].split("=").pop() : null;

    useEffect(() => {
        const isLocal = window.location.hostname == "localhost";
        const url = `${keys.BOX_URL}${userName}/isPermission?isLocal=${isLocal}`;

        const isPermission = async () => {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: jwt,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            if (response.status == 401) {
                setIsLoading(false)
                setIsLoggedIn(true)
            }
            else {
                setIsLoading(false)
            }
        }
        isPermission()
    }, [])

    // return isLoading ? null : isLoggedIn ?
    // redirectToLogin(routes)
    // :<Route {...rest} render={props => { return <Component {...rest} {...props} /> }} />
    return isLoading ?
        ''
        : isLoggedIn ?
            redirectToLogin()
            : <Route {...rest} render={props => { return <Component {...rest} {...props} /> }} />

}

export default ProtectedRoute