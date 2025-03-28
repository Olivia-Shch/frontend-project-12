import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  modalType: '',
  channelId: null,
  channelName: '',
  isOpen: false,
  isError: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, { payload }) => ({
      ...state,
      currentChannelId: payload.id,
      currentChannelName: payload.name,
    }),
    setChannelModal: (state, { payload }) => ({
      ...state,
      modalType: payload.modalName,
      channelId: payload.id,
      channelName: payload.name || '',
      isOpen: true,
    }),
    closeModal: () => ({
      ...initialState,
      currentChannelId: initialState.currentChannelId,
      currentChannelName: initialState.currentChannelName,
    }),
    setDefaultChannel: () => ({
      ...initialState,
    }),
    setError: (state, { payload }) => ({
      ...state,
      isError: true,
      error: payload,
    }),
    clearError: (state) => ({
      ...state,
      isError: false,
      error: null,
    }),
    handleChannelRemoved: (state, { payload }) => ({
      ...state,
      currentChannelId: state.currentChannelId === payload.id 
        ? 1 
        : state.currentChannelId,
      currentChannelName: state.currentChannelId === payload.id 
        ? 'general' 
        : state.currentChannelName,
    }),
    handleChannelRenamed: (state, { payload }) => ({
      ...state,
      currentChannelName: state.currentChannelId === payload.id
        ? payload.name
        : state.currentChannelName,
    }),
  },
});

export const {
  changeChannel,
  setChannelModal,
  closeModal,
  setDefaultChannel,
  setError,
  clearError,
  handleChannelRemoved,
  handleChannelRenamed,
} = appSlice.actions;

export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectCurrentChannelName = (state) => state.app.currentChannelName;
export const selectModalType = (state) => state.app.modalType;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectIsOpen = (state) => state.app.isOpen;
export const selectIsError = (state) => state.app.isError;
export const selectError = (state) => state.app.error;

export default appSlice.reducer;
