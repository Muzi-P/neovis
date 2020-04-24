import React, { Component } from "react";
export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cypher: "MATCH p=()-[r:PRODUCED]->() RETURN p LIMIT 25"
		}
	}
	
  componentDidMount = () => {
    this.draw();
  };
   draw = () => {
		var config = {
		container_id: "viz",
			server_url: "bolt://localhost:7687",
			server_user: "neo4j",
			server_password: "140655",
			labels: {
				"Person": {
					"caption": "name",
					"size": "pagerank",
					// "community": "community",
					"title_properties": [
						"name",
						"pagerank"
					]
				},
				"Movie": {
					"caption": "title",
					"size": "pagerank",
					// "community": "community",
					"title_properties": [
						"name",
						"pagerank"
					]
				},

			},
			relationships: {
				"PRODUCED": {
					"thickness": "weight",
					// "caption": false
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
