
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'
import AddStudent from './Components/AddStudent'
import EditStudent from './Components/EditStudent'
import AddCourse from './Components/AddCourse'
import Courses from './Components/Courses'
import Students from './Components/Students'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/AddStudent' element={<AddStudent/>}/>
        <Route path='/AddCourse' element={<AddCourse/>}/>
        <Route path='/EditStudent/:studentId' element={<EditStudent/>} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/students' element={<Students />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
