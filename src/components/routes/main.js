// routes.js
import React, {Component} from 'react'
import { Route, IndexRoute, Link,Redirect} from 'react-router'

//Main component
class App extends Component{
    componentDidMount(){
        document.body.className=''
    }
    render(){
        return (
            <div>
                <h1>React Universal Blog</h1>
                   <nav>
                      <ul>
                         <li><Link to="/">Home</Link></li>
                         <li><Link to="/about">About</Link></li>
                         <li><Link to="/work">Work</Link></li>
                         <li><Link to="/contact">Contact</Link></li>
                      </ul>
                   </nav>
                { this.props.children }
              </div>        
        )
    }
}

//Pages
class Home extends Component{
    render(){
        return (
          <div>
            <h2>Home</h2>
            <div>Some home page content</div>
          </div>
        )
    }
}
class About extends Component {
  render(){
    return (
      <div>
        <h2>About</h2>
        <div>Some about page content</div>
        {this.props.children}
      </div>
    )
  }
}
class Work extends Component {
  render(){
    return (
      <div>
        <h2>Work</h2>
        <div>Some work page content</div>
      </div>
    )
  }
}
class Contact extends Component {
  render(){
    return (
      <div>
        <h2>Contact</h2>
        <div>Some contact page content</div>
      </div>
    )
  }
}
class NoMatch extends Component {
  render(){
    return (
      <div>
        <h2>NoMatch</h2>
        <div>404 error</div>
      </div>
    )
  }
}

// <Route path="about" component={About}/>
    // <Route path="contact" component={Contact}/>
const routes=(
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    
    <Route path="about" component={About}>
      {/*
      重定向路由地址
      <Redirect from="contact" to="/contact" />
      */}
      {/*
      about/contact
      继承父级，向后延伸路由,因为是组件，所以需要父级提供一个占位符
      */}
      <Route path="contact" component={Contact}/>
    </Route>
    <Route path="contact" component={Contact}/>
    <Route path="work" component={Work}/>
    <Route path="*" component={NoMatch}/>
  </Route>
)

export default routes