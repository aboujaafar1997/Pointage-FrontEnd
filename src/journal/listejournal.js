import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops'
class ListeUtilisateur extends Component {
  state={
    list:[],
    listp:[]
  }
  render() {
    var i=0;
    let list2 = this.state.list.map((list) => {
        return <tr key={i++}>
        <th scope="row" >{list.id}</th>
        <td>{list.event}</td>
        <td>{list.date}</td>
        <td>{list.session}</td>
      </tr>
    });
    return (
      <Spring 
      from={{ opacity:0,marginLeft: -500 }}
      to={{ opacity:1,marginLeft: 0 }}
      config={{delay:80,duration:500}}
>
   {
  props =>(
    <div style={props}>
      <div className="">
<div className="container">
<h1>{this.props.page}</h1>
<div className="form-inline my-2 my-lg-0 float-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par event nom" aria-label="Search" onChange={(e)=>this.recherche(e)}/>
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e)=>this.download(e)} >Actualisé</button>
 </div>
<br/>
<br/>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Evenement</th>
      <th scope="col">Date</th>
      <th scope="col">Session ID</th>
    </tr>
  </thead>
  <tbody>
  {list2}
  </tbody>
</table>



</div>
</div>
  </div>
  )
  }
    </Spring>
  );
  }
  componentDidMount(){
this.download();
  }
  recherche=(e)=>{ 
    this.setState({
      list: this.state.listp.filter((journal) => journal.event.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }
  download=async()=>{
         let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
         let response = await fetch('https://apipnp3.herokuapp.com/api/Journal/list',options);
         let resultat = await response.json();
         this.setState({
           listp:resultat,
           list:resultat,
         });
    
        }
}

export default ListeUtilisateur;
