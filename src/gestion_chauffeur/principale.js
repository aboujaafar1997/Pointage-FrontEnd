import React, { Component } from 'react';
import AjouterChauffeur from './ajouterchauffeur';
import ListChauffeur from './listechauffeur';
import * as Journal from './ajouterjournal';
 import { Spring } from 'react-spring/renderprops'
class PrincipaleChauffeur extends Component {
    state={
 listp:[],
 list:[],
 rolelist:[],
 cin:"",
 npc:0,
 npcc:0,
 nom:"",
 prenom:"",
 date:"",
 adresse:"",
 image:{},
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
     { this.props.match.params.id==="list" ?<ListChauffeur  supprimer={this.supprimer} list={this.state.list} recherche={this.recherche} role={this.rolechange}/>:""}
     { this.props.match.params.id==="ajouter"?<AjouterChauffeur ajouter={this.ajouter} image={this.image} cin={this.cin} npc={this.npc}   npcc={this.npcc} nom={this.nom} prenom={this.prenom} date={this.date} adresse={this.adresse} />:""}
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
      list: this.state.listp.filter((user) => user.cin.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }

  
    download=async()=>{


      let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response = await fetch('https://apipnp3.herokuapp.com/api/Chauffeur/list',options);
     let resultat = await response.json();
     this.setState({
       listp:resultat,
       list:resultat,
           });
     var data={
event:"visité la gestion des Chauffeurs",
session:sessionStorage.getItem('idsession'),
token:sessionStorage.getItem('token')
     }
     Journal.ajouter(data)
    }
    cin = (e) => {
      this.setState({
        cin: e.target.value
      });
    }
    npc = (e) => {
      this.setState({
        npc: e.target.value
      });
    }
    npcc = (e) => {
      this.setState({
        npcc: e.target.value
      });
    }
    nom = (e) => {
      this.setState({
        nom: e.target.value
      });
    }
    prenom = (e) => {
      this.setState({
        prenom: e.target.value
      });
    }
    date = (e) => {
      this.setState({
        date: e.target.value
      });
    }
    adresse = (e) => {
      this.setState({
        adresse: e.target.value
      });
    }
    image = (e) => {
      this.setState({
        image: e.target.files[0]
      });
      console.log(e.target.files[0]);
    }
    ajouter=async (e)=>{
      e.preventDefault();
    //   var data={
    //     cin:this.state.cin,
    //     permisconduit:this.state.npc,
    //     permisconfiance:this.state.npcc,
    //     nom:this.state.nom,
    //     prenom:this.state.prenom,
    //     date_naissance:this.state.date,
    //     adresse:this.state.adresse,
    //   }
     

    //   fetch("https://apipnp3.herokuapp.com/api/Chauffeur/ajouter", {
    //     method: 'POST',
    //     headers: new Headers({
    //         'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    //     }),
    //     body: JSON.stringify(data)
        
    // }).then((response) => {
    //   if (response.ok) {
    //     return response;
    //   } else {
    //     throw new Error('Something went wrong');
    //   }
    // })
    // .then((responseJson) => {
    //   alert("Bien ajouter")
    //     setTimeout(()=>{ this.download() }, 200);
    // })
    // .catch((error) => {
    //   alert("oops les champs a un ereur ou :"+error)
    // });
      
    var formData = new FormData();

    formData.append("image",this.state.image)
    // formData.append('Chauffeur', new Blob([JSON.stringify({
    //     "cin":this.state.cin,
    //     "n_permis_conduit":this.state.npcc,
    //     "nom":this.state.nom,
    //     "prenom":this.state.prenom,
    //     "date_naissance":this.state.date,
    //     "adresse":this.state.adresse,
       
    // })], {
    //         type: "application/json"
    //     }));
    var response0;
    formData.append('cin',this.state.cin);
    formData.append("n_permis_conduit",this.state.npcc);
    formData.append("nom",this.state.nom);
    formData.append("prenom",this.state.prenom);
    formData.append("date_naissance",this.state.date);
    formData.append("adresse",this.state.adresse);
    fetch('https://apipnp3.herokuapp.com/api/Chauffeur/ajouter', {
      
        method: 'POST',
            headers: new Headers({
                'Authorization': 'bearer '+sessionStorage.getItem('token')
            }),
        body: formData
    }).then(function(response) {
      response0=response;
      return response.text();
    })
    .then(function(text) {
      if(response0.status===200)
      {alert("bien ajouter");}
      else if(text==='{"message":"Format non jpg png jpeg !!"}')
      alert(text);
      else {
        alert("ereur des entrer c'est pas la photo");
      }
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });
    
    setTimeout(()=>{ this.download() }, 2000);
 
  var dataj={
    event:"Ajouter un Chauffeur avec id : "+this.state.Chauffeur,
    session:sessionStorage.getItem('idsession'),
    token:sessionStorage.getItem('token')
         }
         Journal.ajouter(dataj)
  }

    
supprimer=async(id)=>{
  console.log("supprition..."+id)
  fetch("https://apipnp3.herokuapp.com/api/Chauffeur/supprimer/"+id, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })

    
});
 setTimeout(()=>{ this.download() }, 2000);
 var dataj={
  event:"supprimer un Chauffeur avec id : "+id,
  session:sessionStorage.getItem('idsession'),
  token:sessionStorage.getItem('token')
       }
       Journal.ajouter(dataj)

 alert("bien supprrimer : "+id)
 
}

}
 

export default PrincipaleChauffeur;
