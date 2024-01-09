import _ from 'lodash'
import Link from 'next/link'
import React from 'react'
import CategoryItem from './category-item'

const categoryList = [
	{
		name: 'Accounting/Finance',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Logistic/Logistic',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Lawyer/Lawyer',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Lawyer/Legal Adviser',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Logistic/Our and Gas',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Office/Administration',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Marketing/Advertising',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Airlines/Airlines',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Airlines/Cabin Crew',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Airlines/Pilot',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Acrhitect/Architect',
		image: './assets/img/top-c-1.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Architect/Interior Design',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Education/Education',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Fashion/Fashion',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Engineer/Engineer',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Automotive Jobs',
		image: './assets/img/top-c-2.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Bank/Non-Bank Fin.',
		image: './assets/img/top-c-3.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Commercial/Supply',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Administration/Data Entry',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Administration/Content Writer',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Administration/Human Resources',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Administration/Secretary',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Administration/Personal Assistant',
		image: './assets/img/top-c-4.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Construction/Facilities',
		image: './assets/img/top-c-5.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Design/Creative',
		image: './assets/img/top-c-6.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Education/Training',
		image: './assets/img/top-c-7.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Engineer/Architects',
		image: './assets/img/top-c-8.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Travel',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Waiter',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Manager',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Supervisor',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Retail/Retail',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Kitchen Chef',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Runner',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospitality/Restaurant',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospital/Nurse',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospital/Doctor',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Hospital/Pharmacist',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Electrical/Repair',
		image: './assets/img/top-c-10.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'IT/Telecommunication',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'IT/Web Designer',
		image: './assets/img/top-c-11.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Marketing/Sales',
		image: './assets/img/top-c-12.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Marketing/Marketing',
		image: './assets/img/top-c-12.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Sales/Real Estate',
		image: './assets/img/top-c-12.svg',
		subtitle: '1234 Jobs',
	},
	{
		name: 'Other/Other',
		image: './assets/img/top-c-9.svg',
		subtitle: '1234 Jobs',
	},
]


const PopularCategories = ({ data }: { data: any }) => {
	return (
		<section className="py-16 md:py-20 lg:py-25 !bg-light">
			<div className="container">
				<div className="text-center mb-14">
					<p className="text-themePrimary font-bold text-xs leading-none mb-2">
						Popular Categories
					</p>
					<h2 className="text-xl font-bold text-black">
						Browse Top Categories
					</h2>
				</div>
				<div className="grid gap-4 xl:gap-5 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
					{_.map(_.slice(data ? data : categoryList, 0, 12), (item, index) => (
						<CategoryItem key={index} data={item} />
					))}
				</div>
				<div className="text-center mt-14">
					<Link href="/all-categories">
						<a className="text-white text-xs font-normal transition-all bg-arsenic px-6 py-2.5 rounded-lg hover:bg-themePrimary">
							Browse All Category
						</a>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default PopularCategories
