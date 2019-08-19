import React, { Component } from 'react';



class ListeUtilisateur extends Component {
  render() {
    var style={
      "width":"100%",
      "overflow": "auto"
    }
    var i =1
    let list2 = this.props.list.map((list) => {
        return <tr key={i}>
        <th scope="row" >{list.id}</th>
        <td>{list.email}</td>
        <td>{list.password}</td>
        <td>{list.authorities[0].authority}</td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.supprimer(list.id)}>Supprimer</button></td>
      </tr>
    });
    return (
      <div className="">
<div className="container">

<div className="form-inline my-2 my-lg-0 float-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par nom" aria-label="Search" onChange={(e)=>this.props.recherche(e)}/>
 </div>
<br/>
<br/>
<div style={style}>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">nom de utillisateur</th>
      <th scope="col">Password</th>
      <th scope="col">Profil</th>
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

export default ListeUtilisateur;
