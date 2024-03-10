import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import routes from "./routes";
import {  Route,BrowserRouter,Routes,Navigate } from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
                    <Routes>
                        {routes.map((route,index) => {
                            switch (route.layout) {
                                case "admin":
                                    return (
                                      <Route
                                      key={index}
                                      path={route.path}
                                      element={
                                        <Admin>
                                          <route.component />
                                        </Admin>
                                      }
                                    />
                                    );
                                case "auth":
                                    return (
                                      <Route
                                      key={index}
                                      path={route.path}
                                      element={
                                        <Auth>
                                          <route.component />
                                        </Auth>
                                      }
                                    />
                                    );
                                    default:
                return null;
                            }
                        })}
                       <Route path="/" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
    </>
  );
}
export default App;
