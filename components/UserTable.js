import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UserTable = () => {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const response = await axios.get('/api/user');
			setUsers(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className='container mx-auto mt-20'>
			<div className='flex flex-col'>
				<div className='overflow-x-auto'>
					<div className='p-1.5 w-full inline-block align-middle'>
						<div className='overflow-hidden border rounded-lg'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead className='bg-deep-purple-800'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-left text-white uppercase '>
											ID
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-left text-white uppercase '>
											Discord
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-left text-white uppercase '>
											Email
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-left text-white uppercase '>
											Name
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-center text-white uppercase '>
											Server
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-center text-white uppercase '>
											Town
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-xs font-bold text-center text-white uppercase '>
											Plot
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-200'>
									{users.map((user, index) => (
										<tr key={index}>
											<td className='px-6 py-4 text-sm font-medium text-gray-400 whitespace-nowrap'>
												{user.id}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.discord}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.email}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.name}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.server}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.town}
											</td>
											<td className='px-6 py-4 text-sm text-gray-400 whitespace-nowrap'>
												{user.plot}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
