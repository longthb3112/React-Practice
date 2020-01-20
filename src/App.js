import React from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      name : 'This is a sample text',
      refTxt :'---',
      items : []
    }
  }
  update(e){
    if(e.target.value === ''){
      this.setState({name: 'Button clicked'})  
    }else{
      this.setState({name: this.refs.name.value, })
    }
    
  }
  updateRef(e){
    this.setState({refTxt : this.test.refs.refInput.value })
  }
  updateNormal(e){
    this.setState({name: e.target.value})
  }
  componentWillMount(){
   let arrayTemp = [{name: 'Long 1'},{name: 'Long 2'},{name: 'Long 3'},{name: 'Long 4'},]
   this.setState({items:arrayTemp})
  }
  filter(e){
    this.setState({filter: e.target.value})
  }
  render(){
    let txt = this.props.txt;
    //filter
    let items = this.state.items;    
    if(this.state.filter){
      items = items.filter(item =>item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    }
    return (
      <div>
      <h1>{txt}</h1>
      <h2>{this.state.name}</h2>
      
      <h4> Normal control</h4>
      <ChildComponent update={this.updateNormal.bind(this)}/>
      <h4> Ref Normal control</h4>
      <input type="text" ref="name" onChange ={this.update.bind(this)}/>     
      <br/><br/>
      <Button update={this.update.bind(this)}>I <Heart/> React</Button>
      <hr/>

      <h3>Ref Component</h3>
      <h1>{this.state.refTxt}</h1>      
      <RefComponent ref={component => this.test = component} 
      update={this.updateRef.bind(this)}></RefComponent>
      <hr/>
      
      <h3>Filter</h3>
      <input type = "text" onChange = {this.filter.bind(this)}/>
      <div>
        {items.map(item => <Person key={item.name} person={item}/>)}
      </div>
      <hr/>
      
      <h3>HOC -  High Order Component</h3>
      <HOCButton>Button</HOCButton>
      </div>
    )
  }
}
const Person = (props) => <h4>{props.person.name}</h4>
class RefComponent extends React.Component{
  render(){
    return (
      <input ref="refInput" type="text" onChange={this.props.update}></input>
    )
  }
}
//HOC component
const Button1 = (props) => <button onClick={props.update}>{props.children} - {props.count}</button>
const HOC = (InnerComponent) => class extends React.Component{
  constructor(){
    super();
    this.state = {count : 0}
  }
  update(){
    this.setState({count: this.state.count + 1})
  }
  render(){
    return (
      <InnerComponent 
      {...this.props}
      {...this.state}
      update = {this.update.bind(this)}
      />
    )
  }
}
const HOCButton = HOC(Button1)

//stateless components with children
const Button = (props) => <button onClick={props.update}>{props.children}</button>
const Heart = (props) => <span>&hearts;</span>

//child component
class ChildComponent extends React.Component{
  render(){
    return (
      <input type="text" onChange= {this.props.update} />
    )
  }
}
App.defaultProps ={
  txt : "this is default value"
}

//Custom validations
App.propTypes = {
  txt(props,propName,component){
    if(props[propName].length < 3){
      return new Error(`${propName} is too short`)
    }
  }
}
export default App;
