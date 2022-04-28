import jwt_decode from 'jwt-decode'
import { JW_TOKEN } from './constants';

// Redirect to login, if token expires
export const redirectToLoginOnTokenExpiration = () => {
    if((Date.now() / 1000) > (jwt_decode(localStorage.getItem(JW_TOKEN))).exp) {
        window.location.reload()
    }
}