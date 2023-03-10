import { useSession, signIn } from 'next-auth/react';

import { Form } from '../components/Form';

export default function Home() {
	const { data: session } = useSession();

	const handleClick = (e) => {
		e.preventDefault();
		signIn();
	};

	if (!session) {
		return (
			<div className='container mx-auto'>
				<button
					onClick={(e) => handleClick(e)}
					className='px-8 py-4 bg-purple-800 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out'
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
					}}>
					SIGN IN WITH DISCORD
				</button>
			</div>
		);
	}

	return <Form session={session} />;
}
