import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from "./Root"
import { Provider } from 'react-redux';
import { store } from './Store/store'
import { getPosts } from './Store/post.slice';

const BASE_URL = "https://realtime-rebbit-backend.vercel.app/api"

store.dispatch(getPosts());

function App() {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
}

export {BASE_URL};

export default App;
