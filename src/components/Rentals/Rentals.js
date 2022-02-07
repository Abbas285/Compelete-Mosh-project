import React, { Component } from 'react'


export class Rentals extends Component {
   state={
        textfile:'',
        file:null
    }
    textfileupload=(e)=>{
        let fils=e.target.files;  
        let fr =new FileReader();
        fr.readAsText(fils[0])
        fr.onload=e=>{
            const file= e.target.result.split(/\r\n|\n/).join('\n');
            this.setState({
                textfile:file
            })
        }

     
//    let fils=e.target.files;   
//    let reader=new FileReader(); 
//    reader.readAsDataURL(fils[0]) 
//    reader.onload=(e)=>{
//   const file= e.target.result.split(/\r\n|\n/).join('\n');

//         return this.setState({
//            textfile:file
//        })
//    }
 
//  reader.readAsText (fils)

   
    }
    handleChange=(event) =>{
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }
    render() {
        return (
            <div>
       <h1>Different file upload</h1>
  <h1>text file</h1>
  <input type="file"  name="file"
  onChange={(e)=>this.textfileupload(e)}/>
  
<textarea value={this.state.textfile}/>


<input type="file" onChange={this.handleChange}/>
        <img src={this.state.file} alt="rental"/>
 </div>
        )
    }
}

export default Rentals
