import {createSlice} from '@reduxjs/toolkit';

export const storeSlice = createSlice({
	name: 'store',
	initialState: {
		mainData: [],
		copyMainData: [],
		dataSlice: [],
	},
	reducers: {
		addStore: (state, data) => {
			state.mainData = data;
		},
		addCopyMainData: (state, data) => {
			state.copyMainData = data;
		},
		
		addDataSlice: (state, data) => {
			state.dataSlice = data;
		},
		addFilterArr: (state, data) => {
			state.filterArr = data;
		},
	}
})

export const {addStore, addDataSlice, addFilterArr, addCopyMainData} = storeSlice.actions;
export const selectStore = state => state.store.mainData;
export const selectDataSlice = state => state.store.dataSlice;
export const selectCopyMainData = state => state.store.copyMainData;

export default storeSlice.reducer;