import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,

  Route,
  Routes,

} from "react-router-dom";
import { useState } from 'react';

let pSize = 6;

function App() {
  //for dark and light mode

  const [theme, setTheme] = useState('light');
  const [progress, setProgress] = useState(0);




  const toggleMode = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.style.backgroundColor = '#0b3441';
    }
    else {
      setTheme('light')
      document.body.style.backgroundColor = 'white'
    }
  }




  return (
    <>
      <div>

        <Router>

          <Navbar theme={theme} toggleMode={toggleMode} />
          <LoadingBar
            height={4}
            color='#f11946'
            progress={progress}
            // onLoaderFinished={() => setProgress(100)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress = {setProgress} key='general' pageSize={pSize} category="general" theme={theme} />} ></Route>
            <Route exact path="/sports" element={<News setProgress = {setProgress}key='sports' pageSize={pSize} category="sports" theme={theme} />} ></Route>
            <Route exact path="/business" element={<News setProgress = {setProgress} key='business' pageSize={pSize} category="business" theme={theme} />}></Route>
            <Route exact path="/health" element={<News setProgress = {setProgress}key='health' pageSize={pSize} category="health" theme={theme} />}></Route>
            <Route exact path="/technology" element={<News setProgress = {setProgress}key='technology' pageSize={pSize} category="technology" theme={theme} />}></Route>
            <Route exact path="/entertainment" element={<News setProgress = {setProgress}key='entertainment' pageSize={pSize} category="entertainment" theme={theme} />}></Route>
            <Route exact path="/science" element={<News setProgress = {setProgress}key='science' pageSize={pSize} category="science" theme={theme} />}></Route>
            <Route exact path="/general" element={<News setProgress = {setProgress}key='general' pageSize={pSize} category="general" theme={theme} />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

//here whe have used key in tjhe News tag because wihtout that react doesnt mount the content in the page it justs change the path of the page
// because of providng a key i.e. also known as a unique key prop react component mount understands that it has to re render the content
export default App;
