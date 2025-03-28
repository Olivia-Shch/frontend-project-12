import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  modalType: '',
  channelId: null,
  channelName: '',
  isOpen: false,
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
      state.channelName = payload.name || '';
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.modalType = '';
      state.channelId = null;
      state.channelName = '';
      state.isOpen = false;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = 1;
      state.currentChannelName = 'general';
    }
  }
});

export const {
  changeChannel,
  setChannelModal,
  closeModal,
  setDefaultChannel
} = appSlice.actions;

export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectCurrentChannelName = (state) => state.app.currentChannelName;
export const selectModalType = (state) => state.app.modalType;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectIsOpen = (state) => state.app.isOpen;

export default appSlice.reducer;
