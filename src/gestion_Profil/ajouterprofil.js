import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Ajouterprofil extends Component {
  render() {
    var i=0
    let list2 = this.props.privslist.map((privslist) => {
      i++
      return <div key={i} className="form-check"> 
      <div>
      <input className="form-check-input" type="checkbox" id="gridCheck 2"  value={privslist.id} onClick={(e)=>this.props.check(e)}/>
      <label className="form-check-label" htmlFor="gridCheck">{privslist.nom_privs} </label></div>
     </div>
  });  


    return (
      <div className="container" >
      <center><h1>Creation d'un profil</h1></center>
      <form>
 
    <div className="form-group ">
      <label htmlFor="inputEmail4">Nom de Profil</label>
      <input type="text" className="form-control" required= "required" id="inputEmail4" placeholder="nom de profil" onChange={(e)=>this.props.profil(e)}/>
    </div>
        {list2}
  
  <button type="reset" className="btn btn-primary ">vidé</button>
  
  <button type="submit" className="btn btn-primary float-right"  onClick={(e)=>this.props.ajouter(e)}><Link  className="btn btn-primary float-right"  to="/gestionprofil/list"> Ajouté </Link></button>
    
</form>
      </div>
    );
  }
}

export default Ajouterprofil;