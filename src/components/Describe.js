
function Describe ({desc}){

	const renderObj = (desc) => {
		let res = [];
		if(desc === undefined || desc.address === undefined){
			return res;
		}
		else {
			res.push(
				<div key={desc.id} className="desc">
					<div>
						<span>Выбран пользователь</span><b>{desc.id}</b>
					</div>

					<div>
						<span>Адрес проживания:</span><b>{desc.address.streetAddress}</b>
					</div>
					<div>
						<span>Город:</span><b>{desc.address.city}</b>
					</div>
					<div>
						<span>Индекс:</span><b>{desc.address.zip}</b>
					</div>
					<div>
						<span>Описание:</span><textarea defaultValue={desc.description}></textarea>
					</div>
				</div>
			);
			return res;
		}
	}

	return(
		<>
			{renderObj(desc)}
		</>
	);
}

export default Describe;