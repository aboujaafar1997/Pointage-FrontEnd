import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AjouterPermie extends Component {
  render() {
    return (
      <div className="container" >
      <center><h1>Création d'un Permis</h1></center>
      <form>
 
    <div className="row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4">N° tag de permis</label>
      <input type="Number" className="form-control" id="input1" placeholder="N° permie de conduit" onChange={(e)=>this.props.ntage(e)}/>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">N° de Chauffeur</label>
      <input type="text" className="form-control" id="input2" placeholder="N° de Chauffeur" onChange={(e)=>this.props.idchauffeur(e)}/>
    </div></div>
  <button type="reset" className="btn btn-primary ">vidé</button>  
  <button type="submit" className="btn btn-primary float-right"  onClick={(e)=>this.props.ajouter(e)}><Link  className="btn btn-primary float-right"  to="/gestionpermis/list"> Ajouté </Link></button>
    
</form>
      </div>
    );
  }
}

export default AjouterPermie;