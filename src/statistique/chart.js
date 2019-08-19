
import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Spring } from 'react-spring/renderprops'

class Chart extends Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Pointage statistique',
          data: [
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }



  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',

  }

  render() {
    return (
      <center><div style={{ "width": "80%", "height": "30%" }}>
        <h1>Statistique <strong>:Nembre de pointage aujourd'hui :</strong>{new Date().getDate}</h1>

        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 0 }}
          config={{ delay: 80, duration: 500 }}
        >
          {

            props => (

              <div style={props}>
                <div className="chart">
                  <Bar
                    data={this.state.chartData}
                    options={{
                      title: {
                        display: this.state.displayTitle,
                        text: 'Nembre de pointage dans chaque poste',
                        fontSize: 25
                      },
                      legend: {
                        display: this.state.displayLegend,
                        position: this.state.legendPosition
                      }
                    }}
                  />

                  <Pie
                    data={this.state.chartData}
                    options={{
                      title: {
                        display: this.state.displayTitle,
                        text: 'Largest Cities In ' + this.state.location,
                        fontSize: 25
                      },
                      legend: {
                        display: this.state.displayLegend,
                        position: this.state.legendPosition
                      }
                    }}
                  />
                </div>
              </div>
            )
          }

        </Spring>
      </div></center>
    )
  }

  async componentDidMount() {
    let options = { method: "POST", headers: { "charset": "utf-8", 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('token') } };
    let response = await fetch('https://apipnp3.herokuapp.com/api/statistique/1', options);
    let resultat = await response.json();
    console.log(resultat)

    var data1 = [];
    var data2 = [];
    data1.push('')
    data2.push(0);
    resultat.map((list) => {
      data1.push(list.id_utilisateur);
      data2.push(list.number);
      return ''
    });
    data1.push('')
    data2.push(0);
    this.setState({
      chartData: {
        labels: data1,
        datasets: [
          {
            label: 'Pointage statistique',
            data: data2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 99, 102, 0.6)'
            ]
          }
        ]
      }
    });

  }

}

export default Chart;
