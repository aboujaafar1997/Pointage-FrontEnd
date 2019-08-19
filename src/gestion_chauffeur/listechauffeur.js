import React, { Component } from 'react';


class ListeChauffeur extends Component {
  render() {
    var style={
      "width":"100%",
      "overflow": "auto"
    }
    var i =1
    let list2 = this.props.list.map((list) => {
        return <tr key={i}>
        <th scope="row" >{i++}</th>
        <td>{list.cin}</td>
        <td>{list.n_permis_conduit}</td>
        <td>{list.nom}</td>
        <td>{list.prenom}</td>
        <td>{list.date_naissance}</td>
        <td>{list.adresse}</td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.supprimer(list.cin)}>Supprimer</button></td>
      </tr>
    });
    return (
      <div className="">
<div className="container">

<div className="form-inline my-2 my-lg-0 float-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par CIN" aria-label="Search" onChange={(e)=>this.props.recherche(e)}/>
 </div>
<br/>
<br/>
<div style={style}>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">CIN</th>
      <th scope="col">Permie de conduit</th>
      <th scope="col">Permie de confiance</th>
      <th scope="col">Nom</th>
      <th scope="col">Prenom</th>
      <th scope="col">Date de naissance</th>
      <th scope="col">Adresse</th>
      <th scope="col">Supprimer</th>

    </tr>
  </thead>
  <tbody>
  {list2}
  </tbody>
</table>


</div>
</div>
</div>
    );
  }
}

export default ListeChauffeur;
