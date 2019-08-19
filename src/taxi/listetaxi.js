import React, { Component } from 'react';
 import { Spring } from 'react-spring/renderprops'
 import * as Journal from './ajouterjournal';


 class ListeUtilisateur extends Component {
  state={
    list:[],
    listp:[]
  }
  render() {
    var Style ={
  "marginLeft":'25px'
    }
    var i=0;
    let list2 = this.state.list.map((list) => {
        return <tr key={i++}>
        <th scope="row" >{list.id}</th>
        <td>{list.matricule}</td>
        <td>{list.modele}</td>
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
<label htmlFor="upload" >importé :</label>
<input  style={Style} type="file" className="btn btn-outline-success my-2 my-sm-0" onChange={(e)=>this.upload(e)} />
<a className="btn btn-outline-success my-2 my-sm-0" style={Style} target="_blank"  rel="noopener noreferrer" href="http://localhost:3000/Excel_templaite/Taxi.xlsx">Templaite</a>
<div className="form-inline my-2 my-lg-0 float-right">
      <input className="form-control mr-sm-2" type="search" placeholder="Recherche par matricule" aria-label="Search" onChange={(e)=>this.recherche(e)}/>
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e)=>this.download(e)} >Actualisé</button>
 </div>
<br/>
<br/>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">matricule</th>
      <th scope="col">modele</th>
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
      list: this.state.listp.filter((profil) => profil.matricule.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
    });
  }
  download=async()=>{
         let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
         let response = await fetch('https://apipnp3.herokuapp.com/api/Taxi/list',options);
         let resultat = await response.json();
         this.setState({
           listp:resultat,
           list:resultat,
         });
    
        }


upload=e=>{

  var formData = new FormData();
  formData.append("file",e.target.files[0])
  formData.append('data', new Blob([JSON.stringify({
      
  })], {
          type: "application/json"
      }));
  fetch('https://apipnp3.herokuapp.com/api/Taxi/upload', {
    
      method: 'POST',
          headers: new Headers({
              'Authorization': 'bearer '+sessionStorage.getItem('token')
          }),
      body: formData
  }).then(function (response) {
      if (response.status !== 200) {
          alert("oops ereur tu pas respecter les normes!");
      } else {
          alert("cool les donnes sont en poche");
      }
  }).catch(function (err) {
      alert("fatal ereur");
  });
  
  setTimeout(()=>{ this.download() }, 2000);

var dataj={
  event:"uploade des taxi la date : ",
  session:sessionStorage.getItem('idsession'),
  token:sessionStorage.getItem('token')
       }
       Journal.ajouter(dataj)
}



        
}

export default ListeUtilisateur;
