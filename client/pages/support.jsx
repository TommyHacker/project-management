/** @format */

const Support = ({ user }) => {
	return (
		<div className='page-container'>
			<h1>Support</h1>
			<div className='dashboard'>
				<h2>Purposeful applicaiton</h2>
				<p>
					This is a simple project management system to demonstrate my ability
					and compitence with express/node.js and react/next noSQL{' '}
				</p>
				<p>
					i would hope that this application leaves the viewer moist and
					wanting, but there will be much to pick apart, which is all part of
					the fun!
				</p>
				<h2>initialising the team</h2>
				<p>
					The app begins with the original user, which it is recommended
					registers their fullName as Admin
				</p>
				<p>
					this does not have to be the first user, just know that whoever sets
					their name as admin first, will have the overall control of the app .
				</p>
				<p>
					from there, every user will have to be manually set as a Dev and/or
					Admin by the admin overlord.
				</p>
				<h2>Projects</h2>
				<p>
					the admin can create "projects" which are meant to be used for big
					picture tasks e.g. eccomerce navigation integration.
				</p>
				<p>
					from there, the admin will assign which devs will participate in the
					project, which will give them the ability to access the project page.
					They will immediately be notified of their inclusion.
				</p>
				<h2>Development</h2>
				<p>
					from there, the devs are able to submit tickets, comment on ticketed
					issues and submit formal updates to the ticket/project.
				</p>
				<p>
					the Admin oversees all, and then has the ability to update the overall
					project progress
				</p>
				<p>
					once a project is completed. it will be set into a kind of legacy
					mode, where it is still existant as data, but cannot be interacted
					with. this will be for reference.
				</p>
				<p>
					ofcorse, the admin overlord has the ability to reinstate the project
					should the need arise.
				</p>
				<h2>Moving on</h2>
				<p>
					now that you understand the application of this software management
					tool... try it for yourself.
				</p>
			</div>
		</div>
	);
};

export default Support;
