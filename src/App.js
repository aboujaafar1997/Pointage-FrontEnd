import React, { Component } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import Notfound from './exception/404';
import PrincipaleUtilisateur from './gestion_utilisateur/principale';
import PrincipaleProfil from './gestion_Profil/principale';
import PrincipalePrivs from './gestion_privs/principale';
import Journal from './journal/listejournal';
import Affectation from './affectation/affectation';
import Session from './session/listesession';
import Taxi from './taxi/listetaxi';
import PrincipalePermis from './gestion_permis/principale';
import PrincipalePointagee from './gestion_pointagee/principale';
import PrincipaleChauffeur from './gestion_chauffeur/principale';
import Chart from './statistique/chart';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import logo from './logo.jpg';
class App extends Component {
  state = {
    affichege: true,
    role: "",
    utilisateur: "",
    mdp: "",
    ip: "",
    acces: null,
    privs: [],
    redirect: false,
    idsession: ""
  }

  render() {
    var stylelogo = {
      "opacity": "0.7",
      "height": "80%",
      "width": "100%",
      "backgroundPosition": "center",
      "backgroundRepeat": "no-repeat",
      "backgroundSize": "cover"
    }
    var table = [];
    //******************Mapping de Component*************** */
    table['statistique'] = <Chart />;
    table['session'] = <Session />;
    table['journal'] = <Journal />;
    table['affectation'] = <Affectation />;
    table['taxi'] = <Taxi />;
    table['pointage'] = <PrincipalePointagee />;
    //******************Mapping de Gestion*************** */
    table['gestionpermis'] = PrincipalePermis;
    table['gestionchauffeur'] = PrincipaleChauffeur;
    table['gestionpointage'] = PrincipalePointagee;
    table['gestionprofil'] = PrincipaleProfil;
    table['gestionutilisateur'] = PrincipaleUtilisateur;
    table['gestionprivs'] = PrincipalePrivs;
    let list = this.state.privs.map((privs) => {
      if (privs.composant.startsWith("gestion")) {
        var path1 = privs.categorie + "/:id";
        return <Route key={privs.id} exact strict path={path1} component={table[privs.composant.toString()]} />
      }
      else {
        var path2 = privs.categorie.toString();
        return <Route key={privs.id} exact strict path={path2} render={(props) => table[privs.composant.toString()]} />
      }
    });
    return (
      <div className="App" id="App">

        <BrowserRouter>

          <Navbar utilisateur={this.state.utilisateur} renderRedirect={this.renderRedirect} logout={this.logout} privs={this.state.privs} acces={this.state.acces} />
          <Switch>
            <Route path='/login' render={(props) => this.state.acces === null ? <Login login={this.login} mdpchange={this.mdpchange} utilisateurchange={this.utilisateurchange} ></Login> : <Redirect to="/" />} />
            {this.state.acces !== null ? list : ""}
            <Route exact path="/" render={(props) => { return (<div>  <center><h1> Gestion de Pointage </h1></center>  <img src={logo} style={stylelogo} className="App-logo img-responsive img-thumbnail" alt="logo" /> </div>) }}></Route>
            <Route exact strict render={(props) => <Notfound />} />
          </Switch>
        </BrowserRouter>




      </div>
    );
  }



  login = async (e) => {

    let data = {
      email: this.state.utilisateur,
      password: this.state.mdp
    }
    e.preventDefault();
    await fetch("https://apipnp3.herokuapp.com/api/login", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    })
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(data => {
        if (data.access_token !== "") {
          var base64Url = data.access_token.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        }
        var role = JSON.parse(window.atob(base64)).id_profil[0].authority
        //role=role.substring(5,role.length);
        sessionStorage.setItem('token', data.access_token);
        this.setState({
          role: role,
          acces: sessionStorage.getItem('token')
        });

        this.session();
        this.getprivs();

      })
      .catch((error) => alert(" ERROR de mote de passe"));
  }
  logout = async (e) => {
    e.preventDefault();
    await sessionStorage.removeItem('token');
    await this.setState({
      acces: null,
      redirect: true,
      utilisateur: ""

    });
  }

  utilisateurchange = (e) => {
    this.setState({
      utilisateur: e.target.value
    });
  }
  mdpchange = (e) => {
    this.setState({
      mdp: e.target.value
    });
  }

  session = async () => {

    const publicIp = await require('public-ip');
    let newDate = await new Date();
    (async () => {
      this.state.ip = await publicIp.v4();
    })();
    this.ip(async (ip) => {
      sessionStorage.setItem('ip', ip)
    });
    setTimeout(async () => {

      var data = await {
        "id_utilisateur": this.state.utilisateur,
        "date": newDate,
        "ip": this.state.ip + "/" + sessionStorage.getItem('ip')
      }
      await fetch("https://apipnp3.herokuapp.com/api/Session/ajouter", {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.state.acces
        }),
        body: JSON.stringify(data)

      })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => {
          sessionStorage.setItem('idsession', data);
        })

    }, 100);

  }

  getprivs = async () => {
    let options = { method: "POST", headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.state.acces } };
    let response = await fetch('https://apipnp3.herokuapp.com/api/profil/list/' + this.state.role, options);
    let resultat = await response.json();
    this.setState({
      privs: resultat.privslist
    });
  }

  ip = (onNewIP) => { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
      iceServers: []
    }),
      noop = function () { },
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
    function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
      // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  }

}

export default App;
