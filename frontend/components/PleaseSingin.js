

import React from 'react'
import Error from "../components/ErrorMessage";

import { CURRENT_USER_QUERY } from './User'
import Singin from './Singin'
import {Query} from 'react-apollo'

 const PleaseSignin =(props) =>{
   return (
     <Query query={CURRENT_USER_QUERY}>
       {({ loading, data, error }) => {
         if (error) ( <Error error={error}/>)
         if (loading)(<p> loading ... </p>)
         if (!data.me) {
           return (
             <div>
               <p>pleaser singin befoure you start</p>
               <Singin />
             </div>
           )
         }
         return props.children;

       }}

     {props.children}
  </Query>
  )
}
export default PleaseSignin;
