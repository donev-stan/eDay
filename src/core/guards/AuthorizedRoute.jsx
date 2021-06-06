import React from 'react'
import { Redirect } from 'react-router';
import { getLoggedSeller } from '../services/AuthService'

export const AuthorizedRoute = (props) => {

    const loggedSeller = getLoggedSeller();

    if (loggedSeller) {
        return <props.component {...props} loggedUser={loggedSeller} />
    }

    return <Redirect to="/login" />
}
