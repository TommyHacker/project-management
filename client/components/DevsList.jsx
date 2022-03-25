/** @format */

import { useState, useEffect } from 'react';
import axios from 'axios';
const DevsList = ({
	addDevsList,
	setAddDevsList,
	assigned,
	setProject,
	project,
}) => {
	const [devs, setDevs] = useState();
	const [available, setAvailable] = useState();

	const getDevs = () => {
		axios
			.get('http://localhost:4000/user/all', { withCredentials: true })
			.then((res) => {
				const availableDevs = res.data.data.filter((dev) => {
					if (!dev.isDeveloper) return;
					return dev;
				});
				setDevs(availableDevs);
			})
			.catch((err) => console.log(err));
	};

	const addDevToAssignedHandler = (fullName) => {
		const newAssigned = project.assigned;
		newAssigned.push(fullName);
		setProject({ ...project, assigned: [...newAssigned] });
	};

	useEffect(() => {
		if (!devs) return getDevs();
		return;
	}, []);

	return (
		<div className='add-devs-list'>
			<h1 style={{ textAlign: 'center' }}>Available</h1>
			<div className='devs-list'>
				{devs &&
					devs.map((dev, index) => {
						if (!assigned.includes(dev.fullName))
							return (
								<h4
									onClick={() => addDevToAssignedHandler(dev.fullName)}
									key={index}>
									{dev.fullName}
								</h4>
							);
					})}
				<button onClick={() => setAddDevsList(false)}>X</button>
			</div>
		</div>
	);
};

export default DevsList;
