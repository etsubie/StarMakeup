// import React from 'react'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from '../src/store/store.jsx';
// import App from './App.jsx';
// import { RouterProvider } from 'react-router-dom'
// import router from './routes/index.jsx';

// ReactDOM.render(
//   <Provider store={store}>
//     <RouterProvider router={router}/>
//     </Provider>,
//   document.getElementById('root')
// );


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router}/>
//   </StrictMode>,
// )
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from '../src/store/store.jsx';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';

// Create the root and render the application
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
