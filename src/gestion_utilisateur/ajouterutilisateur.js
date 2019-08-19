import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AjouterUtilisateur extends Component {
  render() {
    var i=0;
    let list2 = this.props.rolelist.map((rolelist) => {
      return <option key={i++} value={rolelist.id}>{rolelist.nom}</option>
  });
    return (
      <div className="container" >
      <center><h1>Creation d'un utilisateur</h1></center>
      <form>
 
    <div className="form-group ">
      <label htmlFor="inputEmail4">Nom de l'utilasateur</label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="nom de utilisateur" onChange={(e)=>this.props.utilisateur(e)}/>
    </div>
    <div className="form-group ">
      <label htmlFor="inputPassword4">Mote de passe</label>
      <input type="password" className="form-control" required= "required" id="inputPassword4" placeholder="Password"onChange={(e)=>this.props.mdp(e)}/>
    </div>
    <div className="form-group ">
      <label htmlFor="inputPassword4">Répeter le mot de Passe</label>
      <input type="password" className="form-control" required= "required" id="inputPassword" placeholder="Password" onChange={(e)=>this.props.vmdp(e)}/>
    </div>
    
    <div className="form-group col-md-4">
      <label htmlFor="inputState">State</label>
      <select required onChange={(e)=>this.props.role(e)} id="inputState" className="form-control">
        <option defaultValue="">Choose...</option>
        {list2}
      </select>
    </div>
  
  <button type="reset" className="btn btn-primary ">vidé</button>
  
  <button type="submit" className="btn btn-primary float-right"  onClick={(e)=>this.props.ajouter(e)}><Link  className="btn btn-primary float-right"  to="/gestionutilisateur/list"> Ajouté </Link></button>
    
</form>
      </div>
    );
  }
}

export default AjouterUtilisateur;