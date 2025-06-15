import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const familProfileFunction = createAsyncThunk('familProfile', async (id) => {
    try {
        console.log("Thunk called with ID:", id); 
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/family/familyProfile/${id}`);
        console.log("API result:", result);
        const {data, status} = result;
        return {data, status}
    } catch(err) {
        console.log('Error in API call:', err.response || err.message);
        throw new Error(err.response?.data || 'Error fetching data');
    }
});


const familyProfileSlice = createSlice({
    name:'familyProfile',
    initialState:{family:{},loading:false},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(familProfileFunction.pending,(state)=>state.loading = true)
        .addCase(familProfileFunction.fulfilled,(state,action)=>{
            state.loading = false;
            state.family = action.payload.data
        })
        .addCase(familProfileFunction.rejected,(state)=>{
            state.loading = false;
            state.family = null
        })
    }
})

export default familyProfileSlice.reducer