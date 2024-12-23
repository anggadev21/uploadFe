import { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dropdown } from "../input/dropdown";

interface props {
	currentPage: any;
	onChangePage: any;
	pageSize: any;
	siblingCount: any;
	totalCount: any;
}

const usePagination = (
	currentPage: any,
	pageSize: any,
	siblingCount: any = 1,
	totalCount: any
) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		const totalPageNumbers = siblingCount + 5;
		if (totalPageNumbers >= totalPageCount) {
			return rangePage(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = rangePage(1, leftItemCount);

			return [...leftRange, "...", totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = rangePage(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, "...", ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = rangePage(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};

const rangePage = (start: any, end: any) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export const Pagination = ({
	currentPage = 1,
	onChangePage,
	pageSize,
	siblingCount = 1,
	totalCount,
}: props) => {
    const [totalPages, setTotalPages] = useState<any>([]);

	useEffect(() => {
		let totalPages: any = [];
		let total: any = Math.ceil(totalCount / pageSize);
		for (var i: number = 0; i < total; i++) {
			totalPages.push({
				label: i + 1,
			});
		}
		setTotalPages(totalPages);
	}, []);
    
    const paginationRange: any = usePagination(
		currentPage,
		pageSize,
		siblingCount,
		totalCount
	);

	const onNext = () => {
		onChangePage(currentPage + 1);
	};

	const onPrevious = () => {
		if (currentPage - 1 === 0) {
			onChangePage(1);
		} else {
			onChangePage(currentPage - 1);
		}
	};

	return (
		<div className='w-full flex items-center justify-end px-4 py-3 sm:px-6'>
			<div className='flex flex-1 justify-between sm:hidden'>
				<button
					onClick={() => onPrevious()}
					className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
				>
					Previous
				</button>
				<button
					onClick={() => onNext()}
					className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
				>
					Next
				</button>
			</div>
			<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-end'>
				<div>
					<nav
						className='isolate gap-2 inline-flex -space-x-px rounded-md shadow-sm'
						aria-label='Pagination'
					>
						<button
							onClick={() => (currentPage !== 1 ? onPrevious() : false)}
							className='relative cursor-pointer inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
						>
							<span className='sr-only'>Previous</span>
							<FiChevronLeft />
						</button>

						{paginationRange.map((range: any) => {
							if (range === "...") {
								return (
									<button
										key={range}
										className='relative cursor-pointer inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700'
									>
										...
									</button>
								);
							}

							return range === currentPage ? (
								<button
									key={range}
									onClick={() => onChangePage(range)}
									aria-current='page'
									className='relative cursor-pointer z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20'
								>
									{range}
								</button>
							) : (
								<button
									key={range}
									onClick={() => onChangePage(range)}
									className='relative cursor-pointer inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
								>
									{range}
								</button>
							);
						})}
						<button
							onClick={() =>
								paginationRange[paginationRange.length - 1] !== currentPage
									? onNext()
									: false
							}
							className='relative cursor-pointer inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
						>
							<span className='sr-only'>Next</span>
							<FiChevronRight />
						</button>
						<Dropdown
							datas={totalPages}
							id='page'
							name='page'
							placeholder='Page'
							label='Page'
							onChange={(input: any) => {
								let total: any = Math.ceil(totalCount / pageSize);
								if (input.label < total) {
									onChangePage(input.label);
								} else {
									onChangePage(total);
								}
							}}
							menuPlacement='top'
							isMulti={false}
							required={true}
							withLabel={false}
							className='bg-white border border-primary-300 text-gray-900 sm:text-sm rounded-lg block w-full outline-primary-600'
						/>
					</nav>
				</div>
			</div>
		</div>
	);
};
