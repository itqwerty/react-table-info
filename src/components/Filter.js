// import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {
	selectStore, 
	addCopyMainData
} from '../store/storeSlice';

function Filter(){
	const dispatch = useDispatch();
	let mainData = useSelector(selectStore).payload;
	let inputValue = '';
	const getSearchText = (event) => {
		inputValue = event.target.value;
	}

	const searchText = (event) => {
		event.preventDefault()
		let value = inputValue.trim().toLowerCase();
		let sortArr;
		let filterArr = mainData.filter(item => {
			return (
				item['firstName'].toLowerCase().includes(value) || 
				item['lastName'].toLowerCase().includes(value) || 
				item['email'].toLowerCase().includes(value) || 
				item['id'].toString().includes(value) || 
				item['phone'].toLowerCase().includes(value)
				);
		});
		(value !== '') ? sortArr = filterArr : sortArr = mainData;
		dispatch(addCopyMainData(sortArr));
	}

	return(
		<div className="filter">
			<div className="input-group mb-3">
				<input onKeyUp = {getSearchText} type="text" className="form-control" placeholder="Search item" aria-label="Recipient's username" aria-describedby="button-addon2"/>
				<button onClick = {searchText}  className="btn btn-outline-secondary" type="button" id="button-addon2">
					Search
				</button>
			</div>
		</div>
	);
}

export default Filter;