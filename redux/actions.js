import * as types from './types'
import axios from "axios";
import {languages} from "../utils/constants";

export const getData = ( params) => {
    return async (dispatch) => {
        dispatch({
            type: types.TOP20DATA,
            payload: [],
        })
        dispatch({type:types.TOP20LOADING})
        if(params!=="All"){
            axios
                .get(
                    `https://api.github.com/search/repositories?q=${params}&sort=stars&order=desc&per_page=20`
                )
                .then(response => {
                    dispatch({
                        type: types.TOP20DATA,
                        payload: response.data,
                    })
                })
                .catch(error => {
                    dispatch({
                        type: types.TOP20ERROR
                    })
                })
        }else {
            let petitions = Object.keys(languages).map(e=>{
                if(e!=="All"){
                    return axios.get(`https://api.github.com/search/repositories?q=${languages[e].query}&sort=stars&order=desc&per_page=20`)
                }
            })
            petitions = petitions.filter(Boolean)
            let final ={
                incomplete_results:true,
                items:[],
                total_count:0
            }
            axios
                .all(petitions)
                .then(
                    axios.spread((...responses) => {
                        responses.forEach(e=>{
                            final.incomplete_results = final.incomplete_results && e.data.incomplete_results
                            final.items = final.items.concat(e.data.items)
                            final.total_count = final.total_count + e.data.total_count
                        })
                        final.items.sort((a, b) => b.stargazers_count - a.stargazers_count);
                        let newItems = final.items.slice(0,20)
                        final.items = newItems
                        dispatch({
                            type: types.TOP20DATA,
                            payload: final,
                        })

                    })
                )
                .catch(errors => {
                    dispatch({
                        type: types.TOP20ERROR
                    })
                });

        }
    }

}

export const getCommits = ( params) => {
    return async (dispatch) => {
        dispatch({
            type: types.COMMITS,
            payload: [],
        })
        dispatch({type:types.COMMITSLOADING})
        if(params!=="All"){
            axios
                .get(
                    `https://api.github.com/repos/facebook/react/stats/code_frequency`
                )
                .then(response => {
                    dispatch({
                        type: types.COMMITS,
                        payload: response.data,
                    })
                })
                .catch(error => {
                    dispatch({
                        type: types.COMMITSERROR
                    })
                })
        }

    }

}
