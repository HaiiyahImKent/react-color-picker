// App.jsx
import React, { useState } from "react";
import colorsData from "./colors.json";

// Function to determine if text should be light or dark based on background color
function isColorDark(hexColor) {
	const r = parseInt(hexColor.substr(1, 2), 16);
	const g = parseInt(hexColor.substr(3, 2), 16);
	const b = parseInt(hexColor.substr(5, 2), 16);
	const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
	return luminance < 186; // threshold based on perceived brightness
}

export default function App() {
	const [selectedColor, setSelectedColor] = useState(colorsData[0]);

	const textColorClass = isColorDark(selectedColor.Code) ? "text-white" : "text-black";

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex flex-col md:flex-row">
			{/* Selected Color Box */}
			<div
				className={`w-full md:w-[30%] h-1/2 md:h-full flex flex-col justify-center items-center ${textColorClass}`}
				style={{ backgroundColor: selectedColor.Code }}
			>
				<h1 className="text-3xl font-bold text-center px-4">
					{selectedColor.Acronym} - {selectedColor.Color.toUpperCase()}
				</h1>
				<p className="text-lg">{selectedColor.Code}</p>
			</div>

			{/* Color Picker */}
			<div className="w-full md:w-[70%] h-1/2 md:h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 overflow-y-scroll bg-gray-100">
				{colorsData.map((color, index) => {
					const textClass = isColorDark(color.Code) ? "text-white" : "text-black";
					return (
						<div
							key={index}
							className={`h-28 flex justify-center items-center cursor-pointer font-bold text-center ${textClass}`}
							style={{ backgroundColor: color.Code }}
							onClick={() => setSelectedColor(color)}
						>
							<div>
								<p>{color.Acronym}</p>
								<p className="text-sm">{color.Color}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
