import { configureStore } from "@reduxjs/toolkit";

import memberSlice from "../features/member/memberSlice";

const store = configureStore({
  reducer: {
    member: memberSlice,
  },
});

export default store;
