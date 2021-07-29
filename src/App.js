import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import {FormRegAndLog} from "./modules/formregandlog.js"
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoggedIn } from "./modules/userContext";
import { Setings } from "./modules/settingsContext";
import { Home } from "./modules/Home";
import { Settings } from "./modules/Settings";
/**
*@brief
* Adds key at begining
* !! IMPORTANT DONT REMOVE COOKIE YOU CANT RECOVER YOUR ACCOUNT !!
///FIXME tova
*Adds router in App component
*/

function App() {
  const [id, setId] = useState(0)
  const [cookies, setCookie] = useCookies(["key"])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hash, setHash] = useState("")
  const [userOn, setUserOn] = useState(false)
  const [wipe, setWipe] = useState(false)
  const [ReactLogo, setReactLogo] = useState(true)
  const [ReactLogoComp, setReactLogoComp] = useState(<img src={logo} className="App-logo" alt="logo" />)
  const [Leaderboard, setLeaderboard] = useState(true)
  useEffect(() => {
    if(cookies["key"] != null){
      crypto.subtle.importKey("jwk",cookies["key"],{name:"AES-GCM"},true,["encrypt"]).then((data)=>{
        console.log(data)
      })
    }else{
      crypto.subtle.generateKey({
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]).then(data=>{
        crypto.subtle.exportKey("jwk",data).then(kew_json_format=>{
          setCookie("key",JSON.stringify(kew_json_format))
        })})
    }
    
  }, [cookies,setCookie])

  useEffect(() => {
    if(username && password && id){
      setUserOn(true)
    }
  }, [username,password,setPassword,setUsername,userOn,setUserOn,id])
  useEffect(() => {
    if(wipe!==false){
      setPassword("")
      setUsername("")
      setUserOn(false)
      setWipe(false)
      console.log(1)
      setId(0)
    }
    
  }, [username,password,setPassword,setUsername,userOn,setUserOn,wipe,setWipe,id,setId])
  useEffect(()=>{
    if(ReactLogo === true){
      setReactLogoComp(<img src={logo} className="App-logo" alt="logo" />)
    }else if(ReactLogo === false){
      setReactLogoComp(null)
    }
  },[setReactLogoComp,ReactLogo])
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Setings.Provider value={{
            ReactLogo:ReactLogo,
            Leaderboard:Leaderboard
          }}>

{ReactLogoComp}
        <LoggedIn.Provider value={{username:username,
                                  password:password,
                                  logged_in:userOn,id:id,
                                hash:hash}}
                                  > 
          <Switch>
          <Route path="/settings/">
              <Settings setReactLogo = {setReactLogo}  setLeaderboard={setLeaderboard}/>
            </Route>
            <Route path="/:link">
              <FormRegAndLog cookie = {cookies} setUsername = {setUsername} setPassword = {setPassword} setId = {setId} setHash = {setHash}/>
              {/* <Link to="/register">Sign up</Link>
              <Link to="/">Home</Link> */}
            </Route>
            <Route path="/">
              <Home setwipe={setWipe}/>
            </Route>
          </Switch>
          </LoggedIn.Provider>
          </Setings.Provider>
        </header>
      </div>
    </Router>
  );
}

export default App;
