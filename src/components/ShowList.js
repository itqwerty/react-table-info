import {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {
	selectDataSlice,
	selectCopyMainData,
	addCopyMainData
} from '../store/storeSlice';
import Pagination from './Pagination';
import Filter from './Filter';
import Describe from './Describe';
import AddString from './AddString';

function ShowList({dataLoaded}){

// выводим список
	const dispatch = useDispatch();
	const [showHide, setShowHide] = useState('hide');
	const [data, setData] = useState([]);
	const [desc, setDesc] = useState();
	const [arrowState, setArrowState] = useState();
	const [reversSort, setReversSort] = useState(true);
	
	let copyMainData = useSelector(selectCopyMainData);
	let dataSlice = useSelector(selectDataSlice);

	useEffect(()=>{
		if(!dataLoaded || dataSlice.payload === undefined){
			return false;
		}
		else {
			setShowHide('');
			setData(dataSlice.payload);
		}
	}, [dataSlice.payload, dataLoaded, dataSlice])	

// сортировка столбцов
	

	const sortItem = (id) => {
		let copyData = copyMainData.payload.concat();
		let sortData;
		if(reversSort) {
			sortData = copyData.sort(
				(a, b) => {
					if(id !== 'id') {
						return (a[id].toLowerCase() > b[id].toLowerCase() ? 1 : -1);
					}
					return (a[id] > b[id] ? 1 : -1);
				}
			)
		}
		else {
			sortData = copyData.sort(
				(a, b) => {
					if(id !== 'id') {
						return (a[id].toLowerCase() < b[id].toLowerCase() ? 1 : -1);
					}
					return (a[id] < b[id] ? 1 : -1);
				}
			)
		}
		dispatch(addCopyMainData(sortData))
		setReversSort(!reversSort);
		setArrowState(id);
	}

// стрелки

	const arrowUp = <i className="fas fa-chevron-circle-up"></i>;
	const arrowDown = <i className="fas fa-chevron-circle-down"></i>;

	const ArrowItem = () => {
		return (reversSort ? arrowUp : arrowDown);
	}

	const getDesc = (row) => {
		setDesc(row);
	}

	return(
		<div className={showHide}>
			<AddString/>
			<Filter/>
			<table className="table">
				<thead>
				    <tr>
				    	<th onClick={()=> sortItem('id')} scope="col">id {(arrowState === 'id') ? <ArrowItem/> : null}</th>
				    	<th onClick={()=> sortItem('firstName')} scope="col">firstName {(arrowState === 'firstName') ? <ArrowItem/> : null}</th>
				    	<th onClick={()=> sortItem('lastName')} scope="col">lastName {(arrowState === 'lastName') ? <ArrowItem/> : null}</th>
				    	<th onClick={()=> sortItem('email')} scope="col">email {(arrowState === 'email') ? <ArrowItem/> : null}</th>
				    	<th onClick={()=> sortItem('phone')} scope="col">phone {(arrowState === 'phone') ? <ArrowItem/> : null}</th>
				    </tr>
				</thead>
				<tbody>
					{data.map((elem, index)=>
						<tr onClick={() => getDesc(elem)} key={elem.lastName + elem.id + elem.email}>
							<td>{elem.id}</td>
							<td>{elem.firstName}</td>
							<td>{elem.lastName}</td>
							<td>{elem.email}</td>
							<td>{elem.phone}</td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination dataLoaded={dataLoaded}/>
			<Describe desc={desc}/>
		</div>
	);
}

export default ShowList;