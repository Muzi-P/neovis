import React, { Component } from "react";
export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cypher: "MATCH p=(:Troll)-[:RETWEETS]->(:Troll)  RETURN p "
		}
	}
	
  componentDidMount = () => {
    this.draw();
  };
   draw = () => {
		var config = {
		container_id: "viz",
			server_url: "bolt://54.144.129.81:32804",
			server_user: "neo4j",
			server_password: "coats-propeller-noises",
			labels: {
				"User": {
					"caption": "user_key",
					"size": "pagerank",
					"community": "community"
				}
			},
			relationships: {
				"POSTED": {
					caption: false,
					thickness: "count",
				}
			},
			initial_cypher: this.state.cypher
		}

		var viz = new window.NeoVis.default(config);
		viz.render();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	handleClick = (e) => {
		this.draw();
	}

  render() {
    return (
      <div className="App">
		<div className="header"> Neo4j with Neovis.js</div>
		<div className="add">
			<textarea name="" id="cypher" col = "5" onChange = {this.handleChange} ></textarea>
			<button type="button" onClick={this.handleClick}>Submit</button>
		</div>
        <div  className = "content" id="viz"></div>
      </div>
    );
  }
}
