import { configureStore } from "@reduxjs/toolkit";
import familyProfileReducer from './Reducers/FamilyProfile.slice'

const store = configureStore({
  reducer: {
   familyProfile : familyProfileReducer
  },
});

export default store;
