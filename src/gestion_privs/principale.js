import React, { Component } from 'react';
import AjouterPrivs from './ajouterprivs';
import ListPrivs from './listeprivs';
import * as Journal from './ajouterjournal';
import { Spring } from 'react-spring/renderprops'

class PrincipalePrivs extends Component {
 state={
 listp:[],
 list:[],
 nom:"",
 description:"",
 categorie:"",
 composant:""
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
     { this.props.match.params.id==="list" ?  <ListPrivs  supprimer={this.supprimer} list={this.state.list} recherche={this.recherche}/>:""}
     { this.props.match.params.id==="ajouter"?<AjouterPrivs ajouter={this.ajouter} Privs={this.Privs}  list={this.state.list} nom={this.nom} description={this.description} categorie={this.categorie} composant={this.composant}/>:""}
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
      list: this.state.listp.filter((Privs) => Privs.nom.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }
    download=async()=>{
     let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response = await fetch('https://apipnp3.herokuapp.com/api/Privs/list',options);
     let resultat = await response.json();
     this.setState({
       listp:resultat,
       list:resultat,
     });
     var data={
      event:"visité la gestion des privis ",
      session:sessionStorage.getItem('idsession'),
      token:sessionStorage.getItem('token')
           }
           Journal.ajouter(data)
    }
    nom = (e) => {
      this.setState({
        nom: e.target.value
      });
    }
    description = (e) => {
      this.setState({
        description: e.target.value
      });
    }
    categorie = (e) => {
      this.setState({
        categorie: e.target.value
      });
    }
    composant = (e) => {
      this.setState({
        composant: e.target.value
      });
    }

   
    ajouter=async (e)=>{
      e.preventDefault();
      var data={
        nom_privs:this.state.nom,
        description:this.state.description,
        categorie:this.state.categorie,
        composant:this.state.composant
      }
      fetch("https://apipnp3.herokuapp.com/api/Privs/ajouter", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') 
        }),
        body: JSON.stringify(data)
    }).then(function(response) {
      return response.text();
    })
    .then(function(text) {
      alert(text);
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

  var data2={
    event:"ajouter le privs :"+this.state.nom,
    session:sessionStorage.getItem('idsession'),
    token:sessionStorage.getItem('token')
         }
         Journal.ajouter(data2)
  setTimeout(()=>{ this.download() }, 2000);

  }
 
supprimer=async(id)=>{
  fetch("https://apipnp3.herokuapp.com/api/Privs/supprimer/"+id, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })
});
 setTimeout(()=>{ this.download() }, 2000);
 var data2={
  event:"suprimer le privs avec id = :"+id,
  session:sessionStorage.getItem('idsession'),
  token:sessionStorage.getItem('token')
       }
       Journal.ajouter(data2)
 alert("bien supprrimer : "+id)
 
}

}

export default PrincipalePrivs;
