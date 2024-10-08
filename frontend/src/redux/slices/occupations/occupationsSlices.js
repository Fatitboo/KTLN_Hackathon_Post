import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import {redirect} from 'react-router-dom'
const apiPrefix = 'api/v1/occupations';
export const getAllOccupationsAction = createAsyncThunk(
    'occupations/getAll',
    async (payload , {rejectWithValue, getState, dispatch})=>{
        try {
            
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            console.log('get all')
            const {data} = await axios.get(`${baseUrl}/${apiPrefix}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// create occupation
export const createNewOccupationAction = createAsyncThunk(
    'occupations/createOccupation',
    async (occupation, {rejectWithValue, getState, dispatch})=>{
        try {
            
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            
            console.log(occupation)

            const {data} = await axios.post(`${baseUrl}/${apiPrefix}`, occupation,config);
            console.log(data)
            redirect('/Admin/occupation-management')
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update occupation
export const updateOccupationAction = createAsyncThunk(
    'occupations/updateOccupation',
    async (occupation, {rejectWithValue, getState, dispatch})=>{
        try {
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const dt = {
                occupationName:occupation.occupationName,
                listMajor:occupation.listMajor
            }

            const {data} = await axios.put(`${baseUrl}/${apiPrefix}/${occupation.occupationId}`, dt,config);
            console.log(data)
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// delete occupation
export const deleteOccupationAction = createAsyncThunk(
    'occupations/deleteOccupation',
    async (id, {rejectWithValue, getState, dispatch})=>{
        try {
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.delete(`${baseUrl}/${apiPrefix}/${id}`,config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Search occupation
// export const searchOccupationAction = createAsyncThunk(
//     'occupations/searchOccupation',
//     async (payload , {rejectWithValue, getState, dispatch})=>{
//         try {
            
//             const user = getState()?.users;
//             const {userAuth}=user;
//             // http call 
//             const config = {
//                 headers:{
//                     Authorization: `Bearer ${userAuth?.user?.token}`,
//                     'Content-Type':'application/json',
//                 },
//             };
//             console.log('get all')
//             const {data} = await axios.get(`${baseUrl}/${apiPrefix}/search-occupation`, payload, config);
//             return data;
//         } catch (error) {
//             if(!error?.response){
//                 throw error;
//             }
//             return rejectWithValue(error?.response?.data);
//         }
//     }
// )
const occupationsSlices = createSlice({
    name:'occupations',
    initialState:{
        loading:false,
        occupationsList:[],
        appErr:null,
    },
    reducers:{
        
    },
    extraReducers:(builder)=>{
        // get all skills
        builder.addCase(getAllOccupationsAction.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess=false
        }),
        builder.addCase(getAllOccupationsAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.occupationsList=action?.payload;
            state.appErr = null;
        }),
        builder.addCase(getAllOccupationsAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        }),
         // create new occupation 
         builder.addCase(createNewOccupationAction.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(createNewOccupationAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.occupationsList.push(action?.payload?.occupation);
            state.appErr = null;
            state.isSuccess=true;
        }),
        builder.addCase(createNewOccupationAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess=false;
        }),
         // update  occupation 
         builder.addCase(updateOccupationAction.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(updateOccupationAction.fulfilled, (state, action)=>{
            state.loading=false;
            let currentOccupation = state.occupationsList.findIndex((occupation) => occupation.occupationId === action?.payload?.updateOccupation?.occupationId);
            state.occupationsList[currentOccupation] = action?.payload?.updateOccupation;
            state.appErr = null;
            state.isSuccess=true;
        }),
        builder.addCase(updateOccupationAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess=false;
        }),
        // delete  occupation 
        builder.addCase(deleteOccupationAction.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(deleteOccupationAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.occupationsList= state.occupationsList.filter((occupation) => occupation.occupationId  !== action?.payload?.deleteId);
            state.appErr = null;
        }),
        builder.addCase(deleteOccupationAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
        
    }
    
});
export const {reSetOpenEx} = occupationsSlices.actions;
export default occupationsSlices;