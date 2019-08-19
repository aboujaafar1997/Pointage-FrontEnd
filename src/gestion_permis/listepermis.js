import React, { Component } from 'react';


class ListePermie extends Component {
  render() {
    var style={
      "width":"100%",
      "overflow": "auto"
    }
    var i =1
    let list2 = this.props.list.map((list) => {
        return <tr key={i++}>
        <td>{list.id}</td>
        <td>{list.date_del}</td>
        <td>{list.date_exp}</td>
        <td>{list.n_tage}</td>
        <td>{list.is_valide}</td>
        <td>{list.id_chauffeur}</td>
        <td><button className="fa fa-print" onClick={(e)=>this.props.imprission(list.id_chauffeur,list.id)}></button></td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.supprimer(list.id)}>Supprimer</button></td>
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
      <th scope="col">id</th>
      <th scope="col">Date de délivrance</th>
      <th scope="col">Date de expiration</th>
      <th scope="col">N° de tage</th>
      <th scope="col">Valide</th>
      <th scope="col">ID chauffeur</th>
      <th scope="col">Impression</th>
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

export default ListePermie;
