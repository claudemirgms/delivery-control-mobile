import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser.js';
import SelectUnity from './pages/SelectUnity.js';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Home,
        CreateUser,
        SelectUnity,
    })
);

export default Routes;