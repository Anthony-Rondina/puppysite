import { useState, useEffect } from 'react';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import { Route, Routes } from 'react-router-dom'
import Footer from '../../components/Footer';
import Homepage from '../HomePage/Homepage';
import CreateLitter from '../Litters/CreateLitter/CreateLitter';
import EditLitter from '../Litters/EditLitter/EditLitter';
import ViewAllLitters from '../Litters/ViewAllLitters/ViewAllLitters';
import ViewLitter from '../Litters/ViewLitter/ViewLitter';
import CreateParent from '../Parents/CreateParent/CreateParent';
import EditParent from '../Parents/EditParent/EditParent';
import ViewOneParent from '../Parents/ViewOneParent/ViewOneParent';
import ViewAllParents from '../Parents/ViewAllParents/ViewAllParents';
import CreatePuppy from '../Puppy/CreatePuppy/CreatePuppy';
import EditProfile from '../EditProfile/editProfile'
import EditPuppy from '../Puppy/EditPuppy/EditPuppy';
import ViewPuppy from '../Puppy/ViewPuppy/ViewPuppy';
import Header from '../../components/Header';
import WelcomePage from '../WelcomePage/WelcomePage';
function App() {
  const [user, setUser] = useState(getUser())
  const [chosenLitter, setChosenLitter] = useState({})
  const [chosenPuppy, setChosenPuppy] = useState({})
  const [chosenParent, setChosenParent] = useState({})
  const [showLogin, setShowLogin] = useState(true);
  const [litter, setLitter] = useState({})
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
      <Header showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser} user={user} />
      {/* <Navbar showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser} user={user} />
      {user.admin ? //ADMIN users can access everything */}
      <Routes>
        <Route path="/" element={<WelcomePage user={user} />}></Route>
        <Route path="/editprofile" element={<EditProfile user={user} />}></Route>
        <Route path="/mission" element={<Homepage chosenParent={chosenParent} setChosenParent={setChosenParent} user={user} />}></Route>
        <Route path="/createlitter" element={<CreateLitter user={user} />}></Route>
        <Route path="/editlitter/:id/:mom/:dad" element={<EditLitter litter={litter} user={user} />}></Route>
        <Route path="/litter/:id/:mom/:dad" element={<ViewLitter litter={litter} setLitter={setLitter} user={user} />}></Route>
        <Route path="/litters" element={<ViewAllLitters setChosenLitter={setChosenLitter} user={user} />}></Route>
        <Route path="/createparent" element={<CreateParent user={user} />}></Route>
        <Route path="/editparent/:id" element={<EditParent user={user} />}></Route>
        <Route path="/parents" element={<ViewAllParents setChosenParent={setChosenParent} user={user} />}></Route>
        <Route path="/parents/:id" element={<ViewOneParent chosenParent={chosenParent} setChosenParent={setChosenParent} user={user} />}></Route>
        <Route path="/createpuppy/:litterid/:mom/:dad" element={<CreatePuppy user={user} />}></Route>
        <Route path="/puppy/:id" element={<ViewPuppy user={user} />}></Route>
        <Route path="/editpuppy/:id" element={<EditPuppy user={user} />}></Route>
      </Routes>
      {/* :
        //non users can only access gameboard and feedback
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/auth" element={<AuthPage user={user} showLogin={showLogin} setShowLogin={setShowLogin} />}></Route>
          <Route path="/viewlitter/:id" element={<ViewLitters setChosenPuppy={setChosenPuppy} />}></Route>
          <Route path="/viewpuppy/:id" element={<ViewPuppy />}></Route>
          <Route path="/viewlitters" element={<ViewAllLitters setChosenLitter={setChosenLitter} />}></Route>
          <Route path="/parents" element={<ViewAllParents setChosenParent={setChosenParent} />}></Route>
          <Route path="/viewparent/:id" element={<ViewOneParent />}></Route>
        </Routes>
      } */}
      <Footer />
    </div>
  );
}

export default App;
