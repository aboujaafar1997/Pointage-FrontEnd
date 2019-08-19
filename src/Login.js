import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops'
class Login extends Component {
  render() {

    return (
      <Spring
        from={{ opacity: 0, }}
        to={{ opacity: 1, }}
        config={{ delay: 80, duration: 500 }}
      >
        {
          props => (
            <div style={props}>

              <div>
                <div className="container"><br></br>
                  <center><h1>Login</h1></center>
                  <div className="billing checkout_section">
                    <div className="section_title">Bienvenu Cher utilisateur</div>
                    <div className="section_subtitle">Remplir les info pour l'acces</div>

                    <form action="#" className="justify-content-center"  >
                      <div>
                        <div className="row">
                          <div className="col-xl-8">
                            <label htmlFor="checkout_name">Nom de utilisateur</label>
                            <input type="text" id="checkout_name0" className="checkout_input" required="required" onChange={(e) => this.props.utilisateurchange(e)} />
                          </div>
                          <div className="col-xl-8">
                            <label htmlFor="checkout_name">Mote de passe</label>
                            <input type="password" id="checkout_pwd2" className="checkout_input" required="required" onChange={(e) => this.props.mdpchange(e)} />
                          </div>

                        </div>
                        <br />
                        <div className="row">
                          <div className=" col-10 col-xl-7 col-xs-10 col-sm-10  col-md-8 col-xs-11"></div>
                          <button className="  btn btn-outline-success my-2 my-sm-0 " style={this.style} onClick={(e) => this.props.login(e)}>Login</button>
                        </div>
                      </div>
                    </form>


                  </div>
                </div>
              </div>

              <footer style={this.style2}><center><p><span style={this.style3}>ce projet est un SFE de Aboujaafar Othmane : aboujaafar.othmane@gmail.com copyright © 2019</span></p></center></footer>
            </div>
          )
        }
      </Spring>
    );
  }
  style = {
    "float": "right"
  }
  style2 = {
    height: "20px",
    color: "while",
    background: "balck",
    marginTop: "100vh",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  
  }
  style3={
    "font-size": "40px"
    
  }
}

export default Login;
