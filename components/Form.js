import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = ({ session }) => {
	const [values] = useState([
		{
			map: 'mapA',
			plots: ['plotA', 'plotB', 'plotC'],
			img: 'https://images.unsplash.com/photo-1667373517445-bfdded9a7c86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
		},
		{
			map: 'mapB',
			plots: ['plotD', 'plotE', 'plotF'],
			img: 'https://images.unsplash.com/photo-1667337779766-c0166925be12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
		},
		{
			map: 'mapC',
			plots: ['plotG', 'plotH', 'plotI'],
			img: 'https://images.unsplash.com/photo-1667384678260-39038aa5c901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
		},
	]);

	const [selectedMap, setSelectedMap] = useState(null);
	const [selectedMapValues, setSelectedMapValues] = useState([]);
	const [formValues, setFormValues] = useState({
		discord: '',
		email: '',
		name: '',
		server: '',
		map: '',
		plot: '',
	});

	useEffect(() => {
		setFormValues({
			...formValues,
			discord: session.user.name,
			email: session.user.email,
		});
	}, []);

	const handleChangeMap = (e) => {
		const { value } = e.target;

		setSelectedMap(value);
		setFormValues({ ...formValues, map: value, plot: '' });
	};

	const handleChangeForm = (e) => {
		const { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	useEffect(() => {
		setSelectedMapValues(values.filter((value) => value.map === selectedMap));
	}, [selectedMap]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isEmpty = Object.values(formValues).some(
			(x) => x === null || x === ''
		);

		if (isEmpty) {
			toast.error('Please ensure all form fields are completed.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}
		try {
			const response = axios.post('/api/user', formValues);

			setFormValues({
				discord: '',
				email: '',
				name: '',
				server: '',
				map: '',
				plot: '',
			});

			toast.success('Plot added!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong.', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const { name, server, plot } = formValues;
	return (
		<div className='container mx-auto'>
			<form className='w-full  mt-20' onSubmit={handleSubmit}>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-1/2 md:w-1/2 px-3 mb-6 md:mb-0'>
						<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
							Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							type='text'
							name='name'
							value={name}
							onChange={(e) => handleChangeForm(e)}
						/>
					</div>
					<div className='w-1/2 md:w-1/2 px-3'>
						<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
							Server
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							type='text'
							name='server'
							value={server}
							onChange={(e) => handleChangeForm(e)}
						/>
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full px-3'>
						<label
							className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
							for='grid-state'>
							Town
						</label>
						<div className='relative'>
							<select
								onChange={(e) => handleChangeMap(e)}
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-state'
								name='map'>
								<option value='null'>Select a map</option>
								{values.map((value, index) => (
									<option key={index} value={value.map}>
										{value.map}
									</option>
								))}
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>
				</div>
				{!!selectedMapValues.length ? (
					<>
						<div className='grid content-center justify-center mt-6'>
							<Image
								src={selectedMapValues[0].img}
								width={500}
								height={500}
								key={selectedMapValues[0].img}
								alt='map'
							/>
						</div>
						<div className='flex flex-wrap -mx-3 mb-6 mt-6'>
							<div className='w-full px-3'>
								<label
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
									for='grid-state'>
									Plot
								</label>
								<div className='relative'>
									<select
										onChange={(e) => handleChangeForm(e)}
										className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-state'
										name='plot'>
										<option value='null'>Select a plot</option>
										{selectedMapValues[0].plots.map((plotValue, index) => (
											<option key={index} name={plot} value={plotValue}>
												{plotValue}
											</option>
										))}
									</select>
									<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
										<svg
											className='fill-current h-4 w-4'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'>
											<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
				<button className='px-8 py-4 mt-6 mb-6 bg-purple-800 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out'>
					SUBMIT
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};
