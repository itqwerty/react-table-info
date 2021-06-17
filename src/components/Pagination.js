import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
	addDataSlice,
	selectCopyMainData,
} from '../store/storeSlice';

function Pagination({dataLoaded}){
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState([]);
	const [nextDisabled, setNextDisabled] = useState('disabled');
	const [beforeDisabled, setBeforeDisabled] = useState('disabled');
	const [activePage, setActivePage] = useState('active');
	const [showHide, setShowHide] = useState('hide');

	const dispatch = useDispatch();
	let copyMainData = useSelector(selectCopyMainData).payload;

	let totalPages = 0;
	const perPages = 50;

	useEffect(() => {
		if(!dataLoaded){
			return false;
		}
		else{
			let lastRow = currentPage * perPages;
			let firstRow = lastRow - perPages;
			let totalRow = copyMainData.length;
			let dataSlice = copyMainData.slice(firstRow, lastRow);
			totalPages = Math.ceil(totalRow/perPages);
			dispatch(addDataSlice(dataSlice));
			(totalRow < perPages) ? setShowHide('hide') : setShowHide();
			(currentPage === 1) ? setBeforeDisabled('disabled') : setBeforeDisabled('');
			(currentPage === totalPages) ? setNextDisabled('disabled') : setNextDisabled('');
			let count = [];
			for(let i = 1; i <= totalPages; i++){
				count.push(i);
			}
			setPages(count);
		}

	}, [dataLoaded, currentPage, copyMainData]);

	const getCurrentPage = (e) => {
		setCurrentPage(+e.currentTarget.text);
	}	
	const nextCurrentPage = (e) => {
		setCurrentPage(currentPage + 1);
	}	
	const beforeCurrentPage = (e) => {
		setCurrentPage(currentPage - 1);
	}

	return(
		<div className={showHide}>
			<nav aria-label="...">
				<ul className="pagination">
				    <li className={`page-item ${beforeDisabled}`}>
				    	<a onClick={beforeCurrentPage} className="page-link" href="#/" tabIndex="-1" aria-disabled="true">Previous
				    	</a>
				    </li>
				    {pages.map((elem, index) => <li className={(currentPage === elem) ? `page-item ${activePage}` : `page-item`}  key={index} >
				    	<a onClick={getCurrentPage} className="page-link" href="#/">{elem}</a>
				    </li>)}
				    <li className={`page-item ${nextDisabled}`}>
				    	<a onClick={nextCurrentPage} className="page-link" href="#/">Next</a>
				    </li>
				</ul>
			</nav>
		</div>
	);
}

export default Pagination;