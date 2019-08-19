import React, { Component } from 'react';
import Ajouterprofil from './ajouterprofil';
import Listprofil from './listeprofil';
import Listprofilprivs from './listeprofilprivs';
import * as Journal from './ajouterjournal';
import { Spring } from 'react-spring/renderprops';


class PrincipaleProfil extends Component {
    state={
 listp:[],
 list:[],
 profil:"",
 privs:[],
 privslist:[],
 profilpris:[],
 idshowprofil:""
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
     { this.props.match.params.id==="list" ?<Listprofil privsaffiche={this.privsaffiche}  supprimer={this.supprimer} list={this.state.list} recherche={this.recherche}/>:""}
     { this.props.match.params.id==="ajouter"?<Ajouterprofil privslist={this.state.privslist} check={this.check} ajouter={this.ajouter} profil={this.profil}  list={this.state.list} rolelist={this.state.rolelist}/>:""}
     { this.props.match.params.id==="affichage"?<Listprofilprivs idshowprofil={this.state.idshowprofil} profilpris={ this.state.profilpris} show={this.show} list={this.list} supprimer2={this.supprimer2}/>:""}

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
      list: this.state.listp.filter((profil) => profil.nom.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }

  
    download=async()=>{
     let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response = await fetch('https://apipnp3.herokuapp.com/api/profil/list',options);
     let resultat = await response.json();
     let options2 = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
     let response2 = await fetch('https://apipnp3.herokuapp.com/api/Privs/list',options2);
     let resultat2 = await response2.json();
     this.setState({
       listp:resultat,
       list:resultat,
      privslist:resultat2
     });
     var data={
      event:"visité les profiles",
      session:sessionStorage.getItem('idsession'),
      token:sessionStorage.getItem('token')
           }
           Journal.ajouter(data)
    }
    profil = (e) => {
      this.setState({
        profil: e.target.value
      });
    }
    check = (e) => {
      var tabprivs= this.state.privs;
      if(e.target.checked===true){
      if  (tabprivs.indexOf(e.target.value) === -1){
        tabprivs.push(e.target.value);
      this.setState({
        privs: tabprivs
      });
    }
    } else{
   this.setState({
    privs: this.state.privs.splice(tabprivs.indexOf(e.target.value), 1)
  });

    }
   
    }
   
    ajouter=async (e)=>{
      e.preventDefault();
      var data={
        nom:this.state.profil,
        privslist:this.state.privs,
       
      }

      if(this.state.nom!==""){
if(this.state.privs.length >= 1){
      fetch("https://apipnp3.herokuapp.com/api/profil/ajouter", {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
        }),
        body: JSON.stringify(data)
    })
    console.log(data);
    var data2={
      event:"ajoter un profile avec le nom "+this.state.nom,
      session:sessionStorage.getItem('idsession'),
      token:sessionStorage.getItem('token')
           }
           Journal.ajouter(data2)
  alert("Bien ajouter.")
  setTimeout(()=>{ this.download() }, 2000);
  }
  else{
    alert("des champs sont vide")
  }
}
else{
  alert("choisir le role de se profile")

}
    }
supprimer=async(id)=>{
  fetch("https://apipnp3.herokuapp.com/api/profil/supprimer/"+id, {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })
});
 setTimeout(()=>{ this.download() }, 2000);
 var data2={
  event:"supprimer un profile avec id : "+id ,
  session:sessionStorage.getItem('idsession'),
  token:sessionStorage.getItem('token')
       }
       Journal.ajouter(data2)
       setTimeout(()=>{ this.download() }, 2000);
 alert("bien supprrimer : "+id)
 
}

privsaffiche= async (id)=>{
  let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
  let response = await fetch("https://apipnp3.herokuapp.com/api/profil/get/"+id,options);
  let resultat = await response.json();
  this.setState({
    profilpris:resultat,
    idshowprofil:id,
  });
}

show= async(id)=>{
  let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
  let response = await fetch('https://apipnp3.herokuapp.com/api/Privs/get/'+id,options);
  let resultat = await response.json();
  alert("le nom de ce privilege est : "+resultat.nom_privs+" \n description : "+resultat.description);
}
supprimer2= async(id2)=>{

  fetch('https://apipnp3.herokuapp.com/api/ProfilPrivs/supprimer/'+this.state.idshowprofil+"/"+id2,{
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    })
  });
 let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
  let response = await fetch("https://apipnp3.herokuapp.com/api/profil/get/"+this.state.idshowprofil,options);
  let resultat = await response.json();
  
  this.setState({
    profilpris:resultat.privslist,
  });
  alert("en va supprimer ce privs merci")
  var data2={
    event:"supprimer le privs :"+id2+" de le profile"+this.state.idshowprofil,
    session:sessionStorage.getItem('idsession'),
    token:sessionStorage.getItem('token')
         }
         Journal.ajouter(data2)
}

}
 

export default PrincipaleProfil;
