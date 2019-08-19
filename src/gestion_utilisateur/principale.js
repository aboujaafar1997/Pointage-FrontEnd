import React, { Component } from 'react';
import AjouterUtilisateur from './ajouterutilisateur';
import ListUtilisateur from './listeutilisateur';
import * as Journal from './ajouterjournal';
import { Spring } from 'react-spring/renderprops'
class PrincipaleUtilisateur extends Component {
    state={
 listp:[],
 list:[],
 rolelist:[],
 utilisateur:"",
 mdp:"",
 vmdp:"",
 role:"",

    }
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
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
     { this.props.match.params.id==="list" ?<ListUtilisateur page={this.state.page} supprimer={this.supprimer} list={this.state.list} recherche={this.recherche} role={this.rolechange}/>:""}
     { this.props.match.params.id==="ajouter"?<AjouterUtilisateur ajouter={this.ajouter} role={this.rolechange} utilisateur={this.utilisateurchange} mdp={this.mdpchange}   vmdp={this.vmdpchange} rolelist={this.state.rolelist}/>:""}
      </div>
     
     
</div>
)
}
  </Spring>
      );
  }
  async componentDidMount(){
    this.download();
  }
  recherche=(e)=>{ 
    this.setState({
      list: this.state.listp.filter((user) => user.nomUtilsateur.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }

  
    download=async()=>{
     let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response = await fetch('https://apipnp3.herokuapp.com/api/Utilisateur/list',options);
     let resultat = await response.json();
     let options2 = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response2 = await fetch('https://apipnp3.herokuapp.com/api/profil/list',options2);
     let resultat2 = await response2.json();
     this.setState({
       listp:resultat,
       list:resultat,
       rolelist:resultat2
     });
     var data={
event:"visité la gestion des utilisateurs",
session:sessionStorage.getItem('idsession'),
token:sessionStorage.getItem('token')
     }
     Journal.ajouter(data)
    }
    utilisateurchange = (e) => {
      this.setState({
        utilisateur: e.target.value
      });
    }
    rolechange = (e) => {
      this.setState({
        role: e.target.value
      });
    }
    mdpchange = (e) => {
      this.setState({
        mdp: e.target.value
      });
    }
    vmdpchange = (e) => {
      this.setState({
        vmdp: e.target.value
      });
    }
    ajouter=async (e)=>{
      e.preventDefault();
      var data={
        email:this.state.utilisateur,
        password:this.state.mdp,
        id_profil:this.state.role
      }
      
    if(this.state.mdp!=="" && this.state.utilisateur!=="" && this.state.role!==""){
if(this.state.mdp===this.state.vmdp){
      fetch("https://apipnp3.herokuapp.com/api/Utilisateur/ajouter", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
        }),
        body: JSON.stringify(data)
    }).catch( (error) => alert("opps ilya un ereur" ) );
  alert("Bien ajouter.")
  setTimeout(()=>{ this.download() }, 2000);
  var dataj={
    event:"Ajouter un utilisateur avec id : "+this.state.utilisateur,
    session:sessionStorage.getItem('idsession'),
    token:sessionStorage.getItem('token')
         }
         Journal.ajouter(dataj)
  }
  else{
    alert("mote de paase et la virification sont pas egaux")
  }
}
else{
  alert("des champs sont vide")

}
    }
supprimer=async(id)=>{
  fetch("https://apipnp3.herokuapp.com/api/Utilisateur/supprimer/"+id, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })
    
}).catch( (error) => alert(" oops il ya un ereur" ) );
 setTimeout(()=>{ this.download() }, 2000);
 alert("bien supprrimer : "+id)
 this.download();
 var dataj={
  event:"supprimer un utilisateur avec id : "+id,
  session:sessionStorage.getItem('idsession'),
  token:sessionStorage.getItem('token')
       }
       Journal.ajouter(dataj)

}

}
 

export default PrincipaleUtilisateur;
