import React, {Component, Fragment} from 'react';
import TaskList from '../../Molecules/TaskList/taskList';
import TaskHeader from '../../Molecules/TaskHeader/taskHeader';

import {connect } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
 

const URL = 'http://localhost:3003/api/todos';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
          }
          this.handleKeyPress = this.handleKeyPress.bind(this)
          this.handleClick = this.handleClick.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
          this.refresh()
    }

    refresh() {
        axios.get(`${URL}?sort=-createdAt`)
          .then(
            resp => {
              //console.log(resp.data)
              this.setState({ list: resp.data })
            }
          )
      }
      handleClick() {
        //console.log(this.state)
        this.setState({ task: '' });
        //console.log('handleClick executed')
      }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
          this.setState({ task: event.target.value });
          //console.log('enter key pressed', this.state.task);
          const content = this.state.task;
    
          axios.post(URL, { content })
            .then(
              resp => {
                //console.log('fiz um post', resp)
                this.setState({ task: '' })
                this.refresh()
                window.location.reload()
              }
            )
        }
      }

      handleInputChange = (event) => {
      //  debugger
        this.setState({ task: event.target.value }); 
      };


    render() { 
        return (  
            <Col id="ColunaMaisExterna" sm={12} xl={8} style={{ flexDirection: 'column' }}>
            <TaskHeader  handleKeyPress={this.handleKeyPress} value={this.state.value} 
                         handleInputChange={this.handleInputChange}>
            </TaskHeader>   
            {/* <TaskList list={this.state.list} handleListChange={this.refresh}></TaskList>  */}
            <TaskList></TaskList> 
            </Col>  
          );
    }
}
 
export default Tasks
// function mapStateToProps(state){
//   return {
//     list: state.meuState
//   }
// }

//export default connect(mapStateToProps)(Tasks)