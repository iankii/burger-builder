import React from 'react';

import Aux from '../Auxl/Auxl';
import Classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
  <Aux>
    <Toolbar />
    <main className={Classes.Content}>
      {props.children}
    </main>
  </Aux>
)

export default layout;