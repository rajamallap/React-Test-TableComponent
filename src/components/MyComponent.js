import React, { Component } from 'react';
import axios from 'axios';
import './MyComponentCSS.css';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataFromApi: [] , 
            tableHeader: [
                { id:'id', title: 'title', subject:'subject' },
                
             ],
             pageId:0
        
        }
    }
    componentDidMount()
    {
        axios.get('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10')
            .then(res => {
              const dataFromApi = res.data;
              this.setState({ dataFromApi });
            })

        

    }


    GeneratePosts = (event,id)=>
    {
        event.preventDefault();
        
        let base_url = 'http://jsonplaceholder.typicode.com/posts?';
        let startId = id;
        axios.get(base_url+'_start='+id+'&_limit=10')
        .then(res => {
          const dataFromApi = res.data;
          this.setState({ dataFromApi });
        });
    }

   


    handleSubmit=()=>
    {
        alert(JSON.stringify(this.state.dataFromApi) );
        console.log(this.state.dataFromApi);
    }



    renderTableHeader() {
       
        let header = Object.keys(this.state.tableHeader[0]);
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }

     renderTableData() {
        return this.state.dataFromApi.map((student, index) => {
           const { id,body,title } = student 
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{body}</td>
                 <td>{title}</td>
              </tr>
           )
        })
     }



    render() { 
        return ( 
       
<>
        <div>
        <h1 id='title'>Welcome</h1>
        <table id='dataTable'>
           <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
           </tbody>
        </table>
     
<div style={{alignSelf:"center", backgroundColor:"#d1d1d1"}}>
     <button id="myButton" onClick={(e,id) => this.GeneratePosts(e,0)}> 0 to 10 posts</button>
     <button id="myButton" onClick={(e,id) => this.GeneratePosts(e,10)}> 10 to 20 posts</button>
     <button id="myButton" onClick={(e,id) => this.GeneratePosts(e,20)}> 20 to 30 posts</button>
</div>
</div>
     </>  
     );
    }
}
 
export default MyComponent;
