import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Ajouterprofil extends Component {
  Style={
    color: "red"
  }
  render() {


    return (
      <div className="container" >
      <center><h1>Creation d'un privilège</h1></center>
      <form>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Nom privilège</label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="nom de privs" onChange={(e)=>this.props.nom(e)}/>
    </div>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Description</label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="Description " onChange={(e)=>this.props.description(e)}/>
    </div>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Categorie <strong>/catrgorie</strong> <span style={this.Style}>*</span></label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="/Categorie" onChange={(e)=>this.props.categorie(e)}/>
    </div>
    <div className="form-group ">
      <label htmlFor="inputEmail4">Composant</label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="Composant" onChange={(e)=>this.props.composant(e)}/>
    </div>
       
  
  <button type="reset" className="btn btn-primary ">vidé</button>
  
  <button  className="btn btn-primary float-right"  onClick={(e)=>this.props.ajouter(e)}><Link  className="btn btn-primary float-right"  to="/gestionprivs/list"> Ajouté </Link></button>
    
</form>
      </div>
    );
  }
}

export default Ajouterprofil;