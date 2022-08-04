import React from 'react';
import apps from "./components/apps.js";
import Animation from './components/Animation.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx'

function App() {
    return <>
        <Animation/>
        <Main object = {apps}/>
        <Footer/>
    </>
}

export default App;
