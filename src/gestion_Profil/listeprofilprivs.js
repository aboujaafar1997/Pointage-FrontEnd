import React, { Component } from 'react';



class Listeprofilprivs extends Component {
  render() {
    var style={
      "width":"100%",
      "overflow": "auto"
    }
    var i=0
    let list2 = this.props.profilpris.map((privslist) => {
       
        return <tr key={i++}>
        <th scope="row" >{privslist.id}</th>      
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.show(privslist.id)}>Afficher</button></td>
        <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.supprimer2(privslist.id)}>Supprimer</button></td>
      </tr>
    });
    return (
      <div className="">
<div className="container">
<h1>{this.props.page}</h1>
<div className="form-inline my-2 my-lg-0 float-right">
 </div>
<br/>
<br/>
<div style={style}>
<table   className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Afficher le nom</th>
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

export default Listeprofilprivs;
