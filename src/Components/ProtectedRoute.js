import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppContainer from './appContainer'


const ProtectedRoute = ({ component: Component, path, ...rest }, props) => {

    // console.log("protecetd ro", props)
    return (
        <div>
            <Route
                {...rest}
                render={
                    props => {

                        console.log(props)
                        if (!localStorage.getItem('token')) {
                            if (path === '/registration') {
                                // return   <Component {...props} />
                                return <AppContainer {...props} ><Component {...props} /></AppContainer>

                            }

                            else if (path === '/') {
                                // return <Component {...props} />
                                return <AppContainer {...props} ><Component {...props} /></AppContainer>
                            }

                            else
                                // return <FormikForm />
                                return <Redirect to={
                                    {
                                        pathname: "/login",
                                    }
                                } />

                        }


                        else {

                            if (path === '/formik' || path === '/registration' || path === '/') {
                                return <Redirect to={
                                    {
                                        pathname: "/welcome",
                                    }
                                } />
                            }

                            // else if (path === '/createTask') {
                            //     return <Redirect to={
                            //         {
                            //             pathname: "/createTask",
                            //         }
                            //     } />
                            // }

                            // return <Component {...props} />
                            return <AppContainer {...props} ><Component {...props} /></AppContainer>
                        }
                    }
                }
            />
        </div>
    );
}

export default ProtectedRoute;