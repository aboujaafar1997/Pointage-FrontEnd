import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AjouterChauffeur extends Component {
  render() {
    return (
      <div className="container" >
        <center><h1>Creation d'un Chauffeur</h1></center>
        <form>

          <div className="form-group ">
            <label htmlFor="inputEmail4">CIN</label>
            <input type="text" className="form-control" required="required" id="input0" placeholder="CIN" onChange={(e) => this.props.cin(e)} />
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">N° permie de conduit</label>
              <input type="Number" className="form-control" id="input1" placeholder="N° permie de conduit" onChange={(e) => this.props.npc(e)} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">N° permie de confiance</label>
              <input type="Number" className="form-control" id="input2" placeholder="N° permie de confiance" onChange={(e) => this.props.npcc(e)} />
            </div></div>

          <div className="form-group ">
            <label htmlFor="inputPassword4">Nom</label>
            <input type="text" className="form-control" required="required" id="input3" placeholder="Nom" onChange={(e) => this.props.nom(e)} />
          </div>
          <div className="form-group ">
            <label htmlFor="inputPassword4">Prenom</label>
            <input type="text" className="form-control" required="required" id="input4" placeholder="Prenom" onChange={(e) => this.props.prenom(e)} />
          </div>
          <div className="form-group ">
            <label htmlFor="inputPassword4">Date naissance</label>
            <input type="text" name="input" placeholder="YYYY-MM-DD" required id="input5"
              pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
              title="Enter a date in this format YYYY-MM-DD" className="form-control" onChange={(e) => this.props.date(e)} />
          </div>
          <div className="form-group ">
            <label htmlFor="inputPassword4">Adresse</label>
            <input type="text" className="form-control" required="required" id="inputP6" placeholder="adresse" onChange={(e) => this.props.adresse(e)} />
          </div>
          <div className="form-group ">
            <label htmlFor="inputPassword4">Image</label>
            <input type="file" className="form-control" required="required" id="inputP6" placeholder="adresse" onChange={(e) => this.props.image(e)} />
          </div>


          <button type="reset" className="btn btn-primary ">vidé</button>

          <button type="submit" className="btn btn-primary float-right" onClick={(e) => this.props.ajouter(e)}><Link className="btn btn-primary float-right" to="/gestionChauffeur/list"> Ajouté </Link></button>

        </form>
      </div>
    );
  }
}

export default AjouterChauffeur;