import React from 'react'
import { Redirect } from 'react-router';
import { getLoggedSeller } from '../services/AuthService'

export const AuthorizedRoute = (props) => {

    const seller = getLoggedSeller();

    if (seller) {
        return <props.component {...props} />
    }

    return <Redirect to="/login" />
}
