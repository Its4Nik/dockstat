import React from "react";
import { CSSTransition } from "react-transition-group";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import "./css/AdvancedStats.css";
import "./css/ModalAnimations.css";
import "./css/AdvancedStats.css";
import "./css/ModalAnimations.css";

function AdvancedStats({
	id,
	containerName,
	link,
	icon,
	logoSize,
	darkModeLogoColor,
	lightModeLogoColor,
	networkMode,
	containerImage,
	isModalOpen,
	onModelClose,
}) {
	const [isClipboardChecked, setIsClipboardChecked] = React.useState(false);

	const handleCopyClick = () => {
		navigator.clipboard.writeText(id);
		setIsClipboardChecked(true);
		setTimeout(() => setIsClipboardChecked(false), 3000); // Reset after 3 seconds
	};

	const isSimpleIcon = icon && icon.startsWith("SI:");
	const simpleIconName = isSimpleIcon ? icon.substring(3).toLowerCase() : null; // Convert to lowercase for the slug

	return (
		<>
			{/* Modal for displaying the variables */}
			<CSSTransition in={isModalOpen} timeout={300} classNames="modal" unmountOnExit>
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-base-100 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ease-in-out">
					<div className="bg-base-100 rounded-lg shadow-lg p-4 max-w-xl w-full transition-transform transform-gpu duration-300 ease-in-out">
						<h2 className="text-lg font-semibold mb-4 text-center">
							Container Information
						</h2>
						return (
						<>
							{/* Modal for displaying the variables */}
							<CSSTransition in={isModalOpen} timeout={300} classNames="modal" unmountOnExit>
								<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-base-100 backdrop-filter backdrop-blur-sm transition-opacity duration-300 ease-in-out">
									<div className="bg-base-100 rounded-lg shadow-lg p-4 max-w-xl w-full transition-transform transform-gpu duration-300 ease-in-out">
										<h2 className="text-lg font-semibold mb-4 text-center">
											Container Information
										</h2>

										<div className="space-y-3">
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">ID</h3>
												<p className="break-words whitespace-nowrap overflow-hidden text-ellipsis">
													{id}
												</p>
												<button
													onClick={handleCopyClick}
													className="mt-1 btn btn-outline btn-neutral btn-xs"
												>
													{isClipboardChecked ? (
														<span className="flex items-center">
															<FaClipboardCheck className="mr-1" /> Copied!
														</span>
													) : (
														<span className="flex items-center">
															<FaClipboard className="mr-1" /> Copy ID
														</span>
													)}
												</button>
											</div>
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">Container Name</h3>
												<p>{containerName}</p>
											</div>
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">Image</h3>
												<p>{containerImage}</p>
											</div>
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">Network Mode</h3>
												<p>{networkMode}</p>
											</div>
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">Link</h3>
												{link ? (
													<a
														href={link}
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary"
													>
														{link}
													</a>
												) : (
													<p>No link available</p>
												)}
											</div>
											<div className="bg-base-200 p-2 rounded-lg shadow-md text-center">
												<h3 className="text-md font-semibold mb-1">Logo</h3>
												{isSimpleIcon ? (
													<img
														src={`https://cdn.simpleicons.org/${simpleIconName}${lightModeLogoColor && darkModeLogoColor
															? `/${lightModeLogoColor}/${darkModeLogoColor}`
															: ""
															}`}
														alt={`${simpleIconName} Icon`}
														className={`w-20 container-icon mx-auto`}
													/>
												) : icon ? (
													<img
														src={`/icons/${icon}`}
														alt="Container Icon"
														className={`w-20 container-icon mx-auto`}
													/>
												) : (
													<span className="text-secondary">No icon for this container available.</span>
												)}
											</div>
										</div>

										<button
											onClick={(event) => {
												event.stopPropagation();
												onModelClose();
											}}
											className="btn btn-secondary mt-4 w-full"
										>
											Close
										</button>
									</div>
								</div>
							</CSSTransition>
						</>
						);
						<button
							onClick={(event) => {
								event.stopPropagation();
								onModelClose();
							}}
							className="btn btn-secondary mt-4 w-full"
						>
							Close
						</button>
					</div>
				</div>
			</CSSTransition>
		</>
	);
}

export default AdvancedStats;
