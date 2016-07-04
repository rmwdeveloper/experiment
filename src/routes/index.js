// Child Routes
import home from './home';
import App from 'containers';
export default {
  path: '',
  component: App,
  childRoutes: [
    home,
  ],

}