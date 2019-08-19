import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './download.png';

class Navbar extends Component {
    style={
        "color":"rgba(0,0,0,.5)"
    };
    render() {
      var i=0;
      let list;
      if(this.props.acces!==null){
       list = this.props.privs.map((privs) => {
        if(privs.composant.startsWith("gestion")){
          var path1=privs.categorie.toString()+"/list";
          var path2=privs.categorie.toString()+"/ajouter";
        return <li key={i++} className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{privs.nom_privs}</a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link  className="dropdown-item" style={this.style} to={path1}>List</Link> 
          <Link  className="dropdown-item" style={this.style} to={path2}>Ajouter</Link> 
          
        </div>
      </li>
        
    
        
        
        }
      
      else{
          var path=privs.categorie.toString()
        return  <li  key={i++} className="nav-item">
        <Link  className="nav-link" style={this.style} to={path}>{privs.nom_privs}</Link>   
           </li>}
    });}
        return (
        <div >  
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <img className="navbar-brand App-logo"  src={logo}  alt="logo"/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <a className="nav-link" href="/#"> <i className="fas fa-home "></i></a>
      </li>
     
      
      <li className="nav-item active">
      </li>
      {list}
    </ul>
    <span  className="text-info">{this.props.utilisateur}</span>
      <a className="nav-link" href="/#"> <i className="fas fa-question"></i></a>
    {this.props.acces!==null?<button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e)=>this.props.logout(e)}>Deconnecté</button>:<Link className="btn btn-outline-success my-2 my-sm-0 " to="/login">Connecté</Link>		
}

  </div>
</nav>
      </div>
    );
  }
 

}

export default Navbar;
