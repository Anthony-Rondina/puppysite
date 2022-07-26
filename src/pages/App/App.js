import { useState, useEffect } from 'react';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Homepage from '../HomePage/Homepage';
import CreateLitter from '../Litters/CreateLitter/CreateLitter';
import EditLitter from '../Litters/EditLitter/EditLitter';
import ViewAllLitters from '../Litters/ViewAllLitters/ViewAllLitters';
import ViewLitters from '../Litters/ViewLitter/ViewLitters';
import CreateParent from '../Parents/CreateParent/CreateParent';
import EditParent from '../Parents/EditParent/EditParent';
import ViewOneParent from '../Parents/ViewOneParent/ViewOneParent';
import ViewAllParents from '../Parents/ViewAllParents/ViewAllParents';
import CreatePuppy from '../Puppy/CreatePuppy/CreatePuppy';
import EditPuppy from '../Puppy/EditPuppy/EditPuppy';
import ViewPuppy from '../Puppy/ViewPuppy/ViewPuppy';

function App() {
  const [user, setUser] = useState(getUser())
  const [chosenUser, setChosenUser] = useState({})
  const [chosenLitter, setChosenLitter] = useState({})
  const [chosenPuppy, setChosenPuppy] = useState({})
  const [chosenParent, setChosenParent] = useState({})
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getUser()
        setUser(currentUser)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  //use 4 digit code to authenticate admin in user creation
  return (
    <div className="App">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser} user={user} />
      {user ? user.admin ? //ADMIN users can access everything
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/createlitter" element={<CreateLitter user={user} />}></Route>
          <Route path="/editlitter/:id" element={<EditLitter />}></Route>
          <Route path="/viewlitter/:id" element={<ViewLitters />}></Route>
          <Route path="/viewlitters" element={<ViewAllLitters />}></Route>
          <Route path="/createparent" element={<CreateParent />}></Route>
          <Route path="/editparent/:id" element={<EditParent />}></Route>
          <Route path="/viewparents" element={<ViewAllParents />}></Route>
          <Route path="/viewparent/:id" element={<ViewOneParent />}></Route>
          <Route path="/createpuppy" element={<CreatePuppy />}></Route>
          <Route path="/viewpuppy/:id" element={<ViewPuppy />}></Route>
          <Route path="/editpuppy/:id" element={<EditPuppy />}></Route>
        </Routes>
        :
        //normal users can only access gameboard and feedback
        <Routes>
          <Route path="/viewlitter/:id" element={<ViewLitters />}></Route>
          <Route path="/viewpuppy/:id" element={<ViewPuppy />}></Route>
          <Route path="/viewlitters" element={<ViewAllLitters />}></Route>
          <Route path="/auth" element={<AuthPage user={user} showLogin={showLogin} setShowLogin={setShowLogin} />}></Route>
        </Routes>
        :
        //Non users can only access login page
        <AuthPage showLogin={showLogin} setUser={setUser} />
        // <homepage></homepage>
      }
      <Footer />
    </div>
  );
}

export default App;
