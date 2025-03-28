import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  modalType: '',
  channelId: '',
  channelName: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
      state.currentChannelName = payload.name;
    },
    setChannelModal: (state, { payload }) => {
      state.modalType = payload.modalName;
      state.channelId = payload.id;
      state.channelName = payload.name;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = 1;
      state.currentChannelName = 'general';
    },
    closeModal: (state) => {
      state.modalType = '';
      state.channelId = '';
      state.channelName = '';
    },
  },
});

export const {
  changeChannel,
  setChannelModal,
  setDefaultChannel,
  closeModal,
} = appSlice.actions;

export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectCurrentChannelName = (state) => state.app.currentChannelName;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelId = (state) => state.app.channelId;
export const selectModalType = (state) => state.app.modalType;

export default appSlice.reducer;
