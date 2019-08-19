import React, { Component } from 'react';
class Listeprofil extends Component {
  render() {
    var style = {
      "width": "100%",
      "overflow": "auto"
    }
    var i = 0
    let list2 = this.props.list.map((list) => {

      return <tr key={i++}>
        <th scope="row" >{list.id}</th>
        <td>{list.nom_privs}</td>
        <td>{list.description}</td>
        <td>{list.categorie}</td>
        <td>{list.composant}</td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e) => this.props.supprimer(list.id)}>Supprimer</button></td>

      </tr>
    });
    return (
      <div className="">
        <div className="container">
          <h1>{this.props.page}</h1>
          <div className="form-inline my-2 my-lg-0 float-right">
            <input className="form-control mr-sm-2" type="search" placeholder="Recherche par nom" aria-label="Search" onChange={(e) => this.props.recherche(e)} />
          </div>
          <br />
          <br />
          <div style={style}>
            <table className="table ble-striped table-bordered table-sm" cellSpacing="0"
              width="100%">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                  <th scope="col">Categorie</th>
                  <th scope="col">Composant</th>
                  <th scope="col">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {list2}
              </tbody>
            </table>



          </div>
        </div></div>
    );
  }
}

export default Listeprofil;
