import React, { Component } from 'react';


class ListePointage extends Component {
  render() {
    var style={
      "width":"100%",
      "overflow": "auto"
    }
    var i =0;
    let list2 = this.props.list.map((list) => {
      i++;
        return <tr key={i}>
        <td>{list.id}</td>
        <td>{list.id_taxi}</td>
        <td>{list.id_permis}</td>
        <td>{list.id_session}</td>
        <td>{list.date}</td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.supprimer(list.id_taxi,list.id_permis,list.date)}>Supprimer</button></td>
      </tr>
    });
    return (
      <div className="">
<div className="container">

<div className="form-inline my-2 my-lg-0 float-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par N° permis" aria-label="Search" onChange={(e)=>this.props.recherche(e)}/>
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par N° taxi" aria-label="Search" onChange={(e)=>this.props.recherche2(e)}/>

 </div>
<br/>
<br/>
<div style={style}>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">N° de taxi</th>
      <th scope="col">N° de Permis de confiance</th>
      <th scope="col">N° de session</th>
      <th scope="col">Date de validation</th>
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

export default ListePointage;
