import store from '../../../store';

export default (to, from, next) => {
    
    if (store.getters['authenticated'] && localStorage.getItem('token') != null) {
        next();
    } else {
        next({ name: 'Login' });
    }
}