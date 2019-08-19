import React, { Component } from 'react';
import AjouterPermie from './ajouterpermis';
import ListPermie from './listepermis';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops'
import * as Journal from './ajouterjournal';
class PrincipalePermis extends Component {
  state = {
    listp: [],
    list: [],
    ntage: "",
    idchauffeur: "",
  }


  render() {
    return (
      <Spring
        from={{ opacity: 0, marginLeft: -500 }}
        to={{ opacity: 1, marginLeft: 0 }}
        config={{ delay: 80, duration: 500 }}
      >
        {
          props => (
            <div style={props}>

              <div>
                {this.props.match.params.id === "list" ? <ListPermie supprimer={this.supprimer} list={this.state.list} recherche={this.recherche} imprission={this.imprission} role={this.rolechange} /> : ""}
                {this.props.match.params.id === "ajouter" ? <AjouterPermie ajouter={this.ajouter} ntage={this.ntage} idchauffeur={this.idchauffeur} /> : ""}
              </div>


            </div>
          )
        }
      </Spring>
    );
  }
  async componentDidMount() {
    this.download();
  }
  recherche = (e) => {
    this.setState({
      list: this.state.listp.filter((user) => user.idchauffeur.toString().startsWith(e.target.value.toUpperCase()) === true)
    });
  }


  download = async () => {
    let options = { method: "POST", headers: { "charset": "utf-8", 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('token') } };
    let response = await fetch('https://apipnp3.herokuapp.com/api/Permis/list', options);
    let resultat = await response.json();
    this.setState({
      listp: resultat,
      list: resultat,
    });
    var data = {
      event: "visité la gestion des Permiss",
      session: sessionStorage.getItem('idsession'),
      token: sessionStorage.getItem('token')
    }
    Journal.ajouter(data)
  }
  datedel = (e) => {
    this.setState({
      datedel: e.target.value
    });
  }
  dateexp = (e) => {
    this.setState({
      dateexp: e.target.value
    });
  }
  ntage = (e) => {
    this.setState({
      ntage: e.target.value
    });
  }
  idchauffeur = (e) => {
    this.setState({
      idchauffeur: e.target.value
    });
  }

  ajouter = async (e) => {
    e.preventDefault();
    var data = {
      "n_tage": this.state.ntage,
      "is_valide": "true",
      "id_chauffeur": this.state.idchauffeur
    }

    fetch("https://apipnp3.herokuapp.com/api/Permis/ajouter", {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('token')
      }),
      body: JSON.stringify(data)

    }).then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Something went wrong');
      }
    })
      .then((responseJson) => {
        alert("Bien ajouter")
        setTimeout(() => { this.download() }, 200);
      })
      .catch((error) => {
        alert("oops les champs a un ereur ou :" + error)
      });


    var dataj = {
      event: "Ajouter un Permis avec id : " + this.state.id,
      session: sessionStorage.getItem('idsession'),
      token: sessionStorage.getItem('token')
    }
    Journal.ajouter(dataj)
  }
  supprimer = async (id) => {
    fetch("https://apipnp3.herokuapp.com/api/Permis/supprimer/" + id, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('token')
      })


    });
    setTimeout(() => { this.download() }, 2000);
    var dataj = {
      event: "supprimer un Permis avec id : " + id,
      session: sessionStorage.getItem('idsession'),
      token: sessionStorage.getItem('token')
    }
    Journal.ajouter(dataj)

    alert("bien supprrimer : " + id)

  }


  imprission = (id, permis) => {

    //   fetch("https://apipnp3.herokuapp.com/api/PermisDeConfiance/pdf/"+id, {
    //     method: "POST",
    //      responseType: "blob" ,
    //     headers: {
    //         'Content-Type': 'application/json','Authorization': 'bearer '+sessionStorage.getItem('token')
    //     }
    // }).then(response => {


    //      const url = window.URL.createObjectURL(new Blob([response.data]));
    //      const link = document.createElement('a');
    //      link.href = url;
    //      link.setAttribute('download', id+'.pdf'); //or any other extension
    //      document.body.appendChild(link);
    //      link.click(); })
    //   .catch(error => {
    //       console.log(error);
    //   });
    axios("https://apipnp3.herokuapp.com/api/PermisDeConfiance/pdf/" + id + "/" + permis, {
      method: "POST",
      responseType: "blob",
      headers: {
        'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('token')
      }

    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', id + '.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error);
      });
  }


}


export default PrincipalePermis;
