import React from "react";

function App() {
	return (
		<div className="min-h-screen bg-purple-500 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-purple-600 mb-4">
					Tailwind
					CSS
					Test
				</h1>
				<p className="text-gray-600 mb-4">
					If
					you
					can
					see
					styled
					purple
					background
					and
					this
					card,
					Tailwind
					is
					working!
				</p>
				<button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all">
					Test
					Button
				</button>
			</div>
		</div>
	);
}

export default App;
