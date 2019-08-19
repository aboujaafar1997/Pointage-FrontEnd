import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Journal from './ajouterjournal';
import { Spring } from 'react-spring/renderprops'
class Affectation extends Component {
  state={
listprofil:[],
listprivs:[],
profil:"",
privs:"",
  }
  render() {
    var i=0
    let list2 = this.state.listprivs.map((listprivs) => {
      return <option key={i++}value={listprivs.id}>{listprivs.nom_privs}</option>
  });  
  let list3 = this.state.listprofil.map((listprofil) => {
    return <option key={i++} value={listprofil.id}>{listprofil.nom}</option>
});  

    return (
      <Spring 
      from={{ opacity:0,marginLeft: -500 }}
      to={{ opacity:1,marginLeft: 0 }}
      config={{delay:80,duration:500}}
>
   {
  props =>(
    <div style={props}>


      <div className="container" >
      <center><h1>Afféctation des privilèges a un profil</h1></center>
      <form>
 
      <div className="form-group col-md-4">
      <label htmlFor="inputState">Profile</label>
      <select required onChange={(e)=>this.profilchange(e)} id="inputState" className="form-control">
        <option defaultValue>Choose...</option>
        {list3}
      </select>
    </div>

    <div className="form-group col-md-4">
      <label htmlFor="inputState">Privélege</label>
      <select required onChange={(e)=>this.privschange(e)} id="inputState" className="form-control">
        <option defaultValue>Choose...</option>
        {list2}
      </select>
    </div>
  <button type="reset" className="btn btn-primary ">vidé</button>
  
  <button type="submit" className="btn btn-primary float-right"  onClick={(e)=>this.ajouter(e)}><Link  className="btn btn-primary float-right"  to="/gestionprofil/list"> Ajouté </Link></button>
    
</form>
      </div>
   
</div>
)
}
  </Spring>
    );
  }
  componentDidMount() {
    this.download();
  }
  

  download=async()=>{
    let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
    let response = await fetch('https://apipnp3.herokuapp.com/api/Privs/list',options);
    let resultat = await response.json();
    let options2 = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
    let response2 = await fetch('https://apipnp3.herokuapp.com/api/profil/list',options2);
    let resultat2 = await response2.json();
    this.setState({
      listprivs:resultat,
      listprofil:resultat2
    });
    var data={
      event:"visité les affectations",
      session:sessionStorage.getItem('idsession'),
      token:sessionStorage.getItem('token')
           }
           Journal.ajouter(data)
}
privschange = (e) => {
    this.setState({
      privs: e.target.value
    });
    console.log(this.state.role)
  }
  profilchange = (e) => {
    this.setState({
      profil: e.target.value
    });
    console.log(this.state.role)
  }

ajouter=e=>{
 
  if(this.state.profil!==""&& this.state.privs!==""){
        fetch("https://apipnp3.herokuapp.com/api/ProfilPrivs/ajouter/"+this.state.profil+"/"+this.state.privs, {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
          })
      });
      this.setState({
        privs: "",
        profil:""
      });
      alert("Bien affecter")}
      else alert("choisir les donnes dans les champs")
      .catch( (error) => alert(" ERROR" ) );

      var data={
        event:"ajouter le privs"+this.state.privs +"a le profil "+this.state.profil,
        session:sessionStorage.getItem('idsession'),
        token:sessionStorage.getItem('token')
             }
             Journal.ajouter(data)
}


}

export default Affectation;