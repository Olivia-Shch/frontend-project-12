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
    openModal: (state, { payload }) => {
      state.modalType = payload.type;
      state.channelId = payload.id || null;
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
    },
    handleChannelRemoved: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = 1;
        state.currentChannelName = 'general';
      }
    },
    handleChannelRenamed: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelName = payload.name;
      }
    }
  }
});

export const {
  changeChannel,
  openModal,
  closeModal,
  setDefaultChannel,
  handleChannelRemoved,
  handleChannelRenamed,
} = appSlice.actions;

export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectCurrentChannelName = (state) => state.app.currentChannelName;
export const selectModalState = (state) => ({
  type: state.app.modalType,
  id: state.app.channelId,
  name: state.app.channelName,
  isOpen: state.app.isOpen
});

export default appSlice.reducer;
