import React from "react";
import {
  MultiList,
  ReactiveBase,
  ReactiveList
} from "@appbaseio/reactivesearch";

import "./styles.css";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      showFilters : false
    }
  }

  handleShowFilter = () =>{
    this.setState({
      showFilters:!this.state.showFilters
    })
  }

  render() {
    return (
      <ReactiveBase
        app="meetup_app"
        credentials="lW70IgSjr:87c5ae16-73fb-4559-a29e-0a02760d2181"
        theme={{
         typography: {
           fontFamily: "Muli"
         },
         colors: {
           primaryColor: "#747d8c",
           textColor: '#57606f',
           primaryTextColor: '#2f3542',
           titleColor: '#2f3542',
           secondaryColor: '#f1f2f6'
         }
       }}
      >
        <button onClick={this.handleShowFilter}>Show {this.state.showFilters ? 'Meetups🔥' :'Filters🌆'}</button>
        <div className="filters" style={this.state.showFilters ? {width:'100%'} : null}>
          <MultiList
            componentId="CityFilter"
            dataField="group.group_city.raw"
            title="Cities"
            className="card"
            selectAllLabel="All Cities"
            showCheckbox={true}
            showCount={true}
            showSearch={true}
            placeholder="Search City"
            showFilter={true}
            filterLabel="City"
            react={{
              and:["TopicFilter"]
            }}
          />
          <MultiList
            className="card"
            componentId="TopicFilter"
            dataField="group.group_topics.topic_name_raw"
            title="Topics"
            selectAllLabel="All Topics"
            showCheckbox={true}
            showCount={true}
            showSearch={true}
            placeholder="Search topic"
            showFilter={true}
            react={{
              and:["CityFilter"]
            }}
          />
        </div>
        <div className="result" style={this.state.showFilters ? {width:'0%'} : null}>
          <ReactiveList
            componentId="SearchResult"
            pagination={!this.state.showFilters}
            dataField="group_city_ngram"
            paginationAt="bottom"
            pages={5}
            size={10}
            loader="Loading Results.."
            showResultStats={!this.state.showFilters}
            onData={res => (
              <div className="result-card" style={this.state.showFilters ? {display:'none'} : null} key={res.mtime}>
                <div className="image">
                  <img src={res.member.photo} alt={res.member.member_name} />
                </div>
                <div className="description">
                  <h4><span className="bold">{res.member.member_name}</span> is going to <span className="bold">{res.event.event_name}</span></h4>
                  <h6>{res.group.group_city}</h6>
                </div>
                <div className="topics">
                  {res.group.group_topics.map((group,index) => index <= 2 ? <div key={group.topic_name} className="topic">
                    {group.topic_name}
                  </div> : null)}
                </div>
              </div>
            )}
            onResultStats={(total, took) => {
              return <div className="resultStat">{`Found ${total} results in ${took} ms.`}</div>;
            }}
            react={{
              and: ["TopicFilter", "CityFilter"]
            }}
          />
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
