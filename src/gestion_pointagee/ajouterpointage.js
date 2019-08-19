import React, { Component } from 'react';
import logo from './nfc.jpg';

class AjouterPointage extends Component {
  state={
    auto:"1",
    data:{},
    style:{
      display: "yes",
      height:"40px",
      weight:"50px"
    }
  }
  listoption=<div></div>;
  render() {
    
    return (
      <div className="container" >
      <span className="row"><h1>Creation d'un Pointage</h1></span>
      <br></br>
      <div className="row">
    <div className="col-sm-3">
      <select onChange={(e)=>this.auto(e)} className="form-control">
        <option value="1">Auto</option>
        <option value="0">Manuellement</option>
      </select>
    </div>
    <img src={logo} style={this.state.style} className="App-logo img-responsive img-thumbnail" alt="logo"/>
  </div><br/>
  <span className="row"><h3>Etape: <strong ref="helper">1 : saisir le N° taxi</strong></h3></span>
<br/><br/>
    <div className="row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4">N° permie de confiance Chauffeur</label>
      <input type="Number" className="form-control" id="input1" ref="cpDev1" placeholder="N° permis confiance" onChange={(e)=>{this.props.permis(e);this.nextinput(e)} }/>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">N° TAXI</label>
      <input type="text" className="form-control"  ref="cpDev2" placeholder="N° TAXI" list="exampleList" onChange={(e)=>{this.props.taxi(e); this.valide(e); this.gettaxi(e)}}/>
 <datalist id="exampleList">
  {this.listoption}
</datalist>

    </div></div>
  <button type="reset" className="btn btn-primary " onClick={(e)=>this.vide(e)}>vidé</button>  
  <button  className="btn btn-primary float-right" ref="btn0" id="requestButton" onClick={(e)=>this.vide(e)}>Ajouter</button>
      <br/>      <br/>      <br/>
<div  className="alert alert-secondary row d-flex" ref="data" style={this.style3}>
<img src={"http://localhost:8080/storage/"+this.state.data.image} className="App-logo " alt="robot" height="200px" width="150px"/>
<div style={this.style5}>
<span className="row"><pre>Nom                 :</pre> <strong>{this.state.data.nom}</strong></span>
<span className="row"><pre>Prenom              :</pre><strong>{this.state.data.prenom}</strong></span>
<span className="row"><pre>Permie de conduite  :</pre><strong>{this.state.data.n_permis_conduit}</strong></span>
<span className="row"><pre>Date naissance      :</pre><strong>{this.state.data.date_naissance}</strong></span>
<span className="row"><pre>CIN                 :</pre><strong>{this.state.data.cin}</strong></span>
<span className="row"><pre>Adresse             :</pre><strong>{this.state.data.adresse}</strong></span>
</div>
</div>
</div>
    );
  }

componentDidMount(){
  this.refs.cpDev1.focus()
  this.refs.cpDev1.focus()

}


vide=e=>{
this.refs.cpDev2.value=""
 this.refs.cpDev1.value=""
 this.setState({
  data: {}});
  this.refs.cpDev1.focus()


}
gettaxi=async(e)=>{
 var list= this.props.listp.filter((user) => user.id_taxi.toString().startsWith(this.refs.cpDev2.value.toUpperCase())===true)
 var i =0;
 this.listoption = list.map((list) => {
      i++;
      //if(i>this.listoption.length-3){
 return <option key={i} value={list.id_taxi}> date: {list.date}</option>}
     // }
      )

}
nextinput=async(e)=>{
  var taill=e.target.value.length
  if (this.state.auto==="1" && taill>=10){
    let options = {method:"POST",headers : { "charset":"utf-8",'Content-Type':'application/json','Authorization': 'bearer '+sessionStorage.getItem('token') }};
    let response = await fetch('http://localhost:8080/api/PermisDeConfiance/affiche/'+this.refs.cpDev1.value,options);
    let resultat = await response.json();
    if(response.status===500){
      alert("ce permis n'est pas valide !")
      this.refs.cpDev1=""
    }
    else{
    this.setState({
    data:resultat,
          });

  this.refs.cpDev2.focus()
  this.refs.helper.innerHTML ="2 : saisir le N° taxi "}
}
}
valide=async e=>{
  var taill=e.target.value.length
  if (this.state.auto==="1" && taill>=10){
  this.refs.helper.innerHTML ="traitement...(les donnais va traité dans le serveur)";
  setTimeout(() => {
  this.refs.btn0.click();
  this.vide(e);
  }, 200);
  setTimeout(() => {
    this.refs.helper.innerHTML ="1 : saisir le N° permis";    
  }, 2000);
  this.refs.cpDev1.focus();


}
}
auto = (e) => {
  if(e.target.value==="1"){
  this.setState({
    auto: e.target.value,
    style:{
      display: "block",
      height:"40px",
      weight:"50px"
    }
  });
}
else{
  this.setState({
    auto: e.target.value,
    style:{
      display: "none",
   
    }
  });
}
}
style5={
  "marginLeft":"12%",
  "fontSize":"20px"
}
style3={
  "borderRadius": "50px 20px"
}

}

export default AjouterPointage;