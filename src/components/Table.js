import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { 
	addStore,
	addCopyMainData
} from '../store/storeSlice';

import Buttons from './Buttons';
import ShowList from './ShowList';
import Loader from './Loader';

function Table(){
	const [loading, setLoading] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);

	const dispatch = useDispatch();

	const getData = async (dataUrl) => {
		setLoading(true);
		await fetch(dataUrl)
		.then(response => response.json())
		.then(response => {
			dispatch(addStore(response));
			dispatch(addCopyMainData(response));
		});
		setLoading(false);
		setDataLoaded(true);
	}

	return(
		<>
			<Buttons getData={getData}/>
			{loading ? <Loader/> : <ShowList dataLoaded={dataLoaded}/>}
		</>
	);
}

export default Table;