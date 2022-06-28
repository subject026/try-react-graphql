import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  discordName: "",
  discordID: "",
  discordAvatar: "",
  tweets: [],
  skills: [],
  projects: [],
  archiveProjects: [],
  registeredAt: "",
};

const MemberSlice = createSlice({
  name: "Member",
  initialState,
  reducers: {
    setMember(state, action) {
      state._id = action.payload._id;
      state.discordName = action.payload.discordName;
      state.discordID = action.payload.discordID;
      state.discordAvatar = action.payload.discordAvatar;
      state.tweets = [...action.payload.tweets];
      state.skills = [...action.payload.skills];
      state.projects = [...action.payload.projects];
      state.archiveProjects = [...action.payload.archiveProjects];
      state.registeredAt = action.payload.registeredAt;
    },
  },
});

export default MemberSlice.reducer;
export const { setMember } = MemberSlice.actions;
