import React, { useState, useEffect } from "react";
import { FaMemory, FaMicrochip, FaArrowDown, FaArrowUp, FaLink } from "react-icons/fa";
import { BsFillHddNetworkFill } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import AdvancedStats from "./AdvancedStats";
import "react-toastify/dist/ReactToastify.css";
import "./css/ContainerStats.css";
import "./css/LogoSizes.css";
import "./css/Tags.css";

function formatBytesToMB(bytes) {
	return (bytes / (1024 * 1024)).toFixed(2);
}

function formatBytesToGB(bytes) {
	return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

function calculateCpuPercentage(cpuUsage, cpuLimit) {
	if (!cpuLimit || cpuLimit === 0) return "N/A";
	return ((cpuUsage / cpuLimit) * 100).toFixed(2);
}

function getStatusClass(status) {
	switch (status) {
		case "running":
			return "status-green";
		case "starting":
			return "status-orange";
		case "error":
			return "status-red";
		default:
			return "status-grey";
	}
}

function parseTags(tags) {
	return tags.split(",").map((tag) => {
		const [tagName, colorClass] = tag.split(":");
		return { tagName, colorClass: `border-2 border-${colorClass}` };
	});
}

function ContainerStats({ container, logoSize, darkModeLogoColor, lightModeLogoColor }) {
	const {
		name,
		state,
		cpu_usage,
		mem_usage,
		mem_limit,
		current_net_rx,
		current_net_tx,
		link,
		icon,
		id,
		networkMode,
		tags,
		image,
	} = container;
	const [prevCpuUsage, setPrevCpuUsage] = useState(cpu_usage);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const cpuPercentage = calculateCpuPercentage(cpu_usage, 100000000000000);
	let isHostNetwork = "";

	useEffect(() => {
		setPrevCpuUsage(cpu_usage);
	}, [cpu_usage]);

	const containerName = name.startsWith("/") ? name.substring(1) : name;
	const isSimpleIcon = icon && icon.startsWith("SI:");
	const simpleIconName = isSimpleIcon ? icon.substring(3).toLowerCase() : null;
	isHostNetwork = networkMode === "Host" || networkMode === "host" ? "1" : "";

	const parsedTags = tags ? parseTags(tags) : [];
	return (
		<div
			className="card shadow-md p-4 rounded-lg border border-base-300 relative hover:shadow-xl ease-in-out transition-all space-y-1 cursor-pointer"
			onClick={() => {
				setIsModalOpen(true);
			}}
		>
			<ToastContainer />

			<AdvancedStats
				networkMode={networkMode}
				id={id}
				containerName={containerName}
				link={link}
				icon={icon}
				darkModeLogoColor={darkModeLogoColor}
				lightModeLogoColor={lightModeLogoColor}
				containerImage={image}
				isModalOpen={isModalOpen} // Pass modal state
				onModelClose={() => {
					setIsModalOpen(false);
				}}
			/>

			<div className="flex items-center justify-between cursor">
				<div className="flex items-center">
					<div
						className={`status-orb ${getStatusClass(state)} ${state === "running" || state === "starting" || state === "error"
								? "pulse"
								: ""
							}`}
					></div>
					{link ? (
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center"
						>
							<FaLink className="mr-1 text-primary" />
							<h3 className="font-semibold text-lg ml-1 mr-2">{containerName}</h3>
							<div>
								{parsedTags.map((tag, index) => (
									<span
										key={index}
										className={`${tag.colorClass} text-xs font-semibold ml-2 px-2 rounded-xl`}
									>
										{tag.tagName}
									</span>
								))}
							</div>
						</a>
					) : (
						<div className="flex items-center">
							<h3 className="font-semibold text-lg ml-0 mr-2">{containerName}</h3>
							<div>
								{parsedTags.map((tag, index) => (
									<span
										key={index}
										className={`${tag.colorClass} text-xs font-semibold ml-2 px-2 rounded-xl`}
									>
										{tag.tagName}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center mt-2">
				<FaMicrochip className="mr-2 text-primary" />
				<p>{cpuPercentage}%</p>
			</div>
			<div className="flex items-center mt-2">
				<FaMemory className="mr-2 text-primary" />
				<p>
					{formatBytesToGB(mem_usage)} GB / {formatBytesToGB(mem_limit)} GB
				</p>
			</div>
			{isHostNetwork ? (
				<div className="flex items-center mt-2">
					<BsFillHddNetworkFill className="mr-2 text-primary" />
					<p>Host network</p>
				</div>
			) : (
				<>
					<div className="flex items-center mt-2">
						<FaArrowUp
							className={`network-stats ${current_net_tx !== 0 ? "pulse" : ""
								} mr-2 text-info`}
						/>
						<p>{formatBytesToMB(current_net_tx)} MB/s</p>
					</div>
					<div className="flex items-center mt-2">
						<FaArrowDown
							className={`network-stats ${current_net_rx !== 0 ? "pulse" : ""
								} mr-2 text-info`}
						/>
						<p>{formatBytesToMB(current_net_rx)} MB/s</p>
					</div>
				</>
			)}

			{isSimpleIcon ? (
				<img
					src={`https://cdn.simpleicons.org/${simpleIconName}${lightModeLogoColor && darkModeLogoColor
							? `/${lightModeLogoColor}/${darkModeLogoColor}`
							: ""
						}`}
					alt={`${simpleIconName} Icon`}
					className={`${logoSize} container-icon absolute bottom-0 right-0 p-2`}
				/>
			) : (
				icon && (
					<img
						src={`/icons/${icon}`}
						alt="Container Icon"
						className={`${logoSize} container-icon absolute bottom-0 right-0 p-2`}
					/>
				)
			)}
		</div>
	);
}

export default ContainerStats;
