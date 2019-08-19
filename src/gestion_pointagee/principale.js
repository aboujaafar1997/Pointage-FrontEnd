import React, { Component } from 'react';
import AjouterPointage from './ajouterpointage';
import ListPointage from './listepointage';
import * as Journal from './ajouterjournal';
import { Spring } from 'react-spring/renderprops'
class PrincipalePointage extends Component {
    state={
 listp:[],
 list:[],

 taxi:"",
 permis:"",
    }
 

render() {
    return (
      <Spring 
      from={{ opacity:0,marginLeft: -500 }}
      to={{ opacity:1,marginLeft: 0 }}
      config={{delay:80,duration:500}}
>
   {
  props =>(
    <div style={props}>
      <div>
     { this.props.match.params.id==="list" ?<ListPointage  supprimer={this.supprimer} list={this.state.list} recherche={this.recherche} recherche2={this.recherche2} />:""}
     { this.props.match.params.id==="ajouter"?<AjouterPointage listp ={this.state.listp} ajouter={this.ajouter}   taxi={this.taxi} permis={this.permis}  />:""}
      </div>
      </div>
)
}
  </Spring>
      );
  }
  async componentDidMount(){
    this.download();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration('./service-worker.js').then((registration) => {
          return navigator.serviceWorker.ready;
      }).then((registration) => {
          // register sync
          document.getElementById('requestButton').addEventListener('click', (a) => {  
              var data={
                "id_taxi":this.state.taxi,
                "id_permis":this.state.permis,
                "id_session": sessionStorage.getItem('idsession'),
                "date": new Date(),
              }
              // ReactDOM.findDOMNode("cpDev1").value=""
              // React.findDOMNode(this.refs.brand.cpDev2).value=''
              // ReactDOM.findDOMNode(this.refs.cpDev2).value=""
              
              navigator.serviceWorker.controller.postMessage({
                  type: 'sync',
                  data,
                  token:sessionStorage.getItem('token'),
              })
              registration.sync.register('message').then(() => {
                  console.log('sync registered');
              }).catch(function(error) {
                  console.log('Unable to fetch.');
              });
          });
      }).catch(function(error) {
          console.log('Unable to register Service Worker.');
      });
  } else {
      console.log('Service Worker functionality not supported.');
  }        
    
  }
  
  recherche=(e)=>{ 
    this.setState({
      list: this.state.listp.filter((user) => user.id_permis.toString().startsWith(e.target.value.toUpperCase())===true)
    });
  }
  recherche2=(e)=>{ 
    this.setState({
      list: this.state.listp.filter((user) => user.id_taxi.toString().startsWith(e.target.value.toUpperCase())===true)
    });
  }

  
    download=async()=>{
     let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response = await fetch('https://apipnp3.herokuapp.com/api/Pointage/list',options);
     let resultat = await response.json();
     this.setState({
       listp:resultat,
       list:resultat,
           });
     var data={
event:"visité la gestion des pointages",
session:sessionStorage.getItem('idsession'),
token:sessionStorage.getItem('token')
     }
    await Journal.ajouter(data)
    }
    taxi = (e) => {
      this.setState({
        taxi: e.target.value
      });
    }
    permis = (e) => {
      this.setState({
        permis: e.target.value
      });
    }
    
    
    ajouter=async (e)=>{
      e.preventDefault();
      var data={
        "id_taxi":this.state.taxi,
        "id_permis":this.state.permis,
        "id_session": sessionStorage.getItem('idsession'),
        "date": new Date(),
      }
     

     await fetch("https://apipnp3.herokuapp.com/api/Pointage/ajouter", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
        }),
        body: JSON.stringify(data)
        
    }).then(function (response) {
      if (response.status !== 200) {
          alert("permie expiré ou il ya un ereur input!!");
      } else {
          alert("Bien ajouter ");
          
        }
      }).catch(function (err) {
        alert("ereur");
      });
      setTimeout(()=>{ this.download() }, 2000);
      
 
  var dataj={
    event:"Ajouter un Permis avec id : "+this.state.id,
    session:sessionStorage.getItem('idsession'),
    token:sessionStorage.getItem('token')
         }
         Journal.ajouter(dataj)
  }

    
supprimer=async(id1,id2,date)=>{
 await fetch("https://apipnp3.herokuapp.com/api/Pointage/supprimer/"+id1+"/"+id2+"/"+date, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })
}).then(function (response) {
      if (response.status !== 200) {
          alert("opps error!");
      } else {
        var dataj={
          event:"supprimer un Permis avec id : "+id1+"/"+id2+"/"+date,
          session:sessionStorage.getItem('idsession'),
          token:sessionStorage.getItem('token')
        }
        Journal.ajouter(dataj)
        
        alert("bien supprrimer : "+id1+"/"+id2+"/"+date)
      }
    }).catch(function (err) {
      alert("ereur"+err);
    });
    setTimeout(()=>{this.download(); }, 2000);
 
}




}
 

export default PrincipalePointage;
