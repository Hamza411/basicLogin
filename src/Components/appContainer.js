import React from 'react';
import Header from './Header';


function AppContainer(props) {
  // console.log("in app contiae")
  // console.log(props)
  return (
    <>
      <Header />
      {/* <Component {...props}/> */}
      {props.children}
    </>
  )
}

export default AppContainer