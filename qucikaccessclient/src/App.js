// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Css import 
import "./asset/home.css"


import Home from './pages/Home'


function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
library.add(fab, fas, far)
