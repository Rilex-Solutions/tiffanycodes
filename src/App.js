import React, { useState, useEffect } from "react";
import {
	Menu,
	X,
	MapPin,
	ArrowRight,
	Github,
	Linkedin,
	Mail,
	ExternalLink,
} from "lucide-react";
import { personalInfo } from "./data/personal";

const Portfolio = () => {
	const [isMenuOpen, setIsMenuOpen] =
		useState(
			false
		);
	const [isScrolled, setIsScrolled] =
		useState(
			false
		);

	useEffect(() => {
		const handleScroll =
			() => {
				setIsScrolled(
					window.scrollY >
						50
				);
			};
		window.addEventListener(
			"scroll",
			handleScroll
		);
		return () =>
			window.removeEventListener(
				"scroll",
				handleScroll
			);
	}, []);

	const toggleMenu = () =>
		setIsMenuOpen(
			!isMenuOpen
		);

	const scrollToSection = (sectionId) => {
		const element =
			document.getElementById(
				sectionId
			);
		element?.scrollIntoView(
			{
				behavior: "smooth",
			}
		);
		setIsMenuOpen(
			false
		);
	};

	const services = [];

	const projects = [];

	return (
		<div className="min-h-screen bg-gray-50 overflow-x-hidden">
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-300 ${
					isScrolled
						? "bg-white/95 backdrop-blur-md shadow-lg"
						: "bg-white"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div
							className="flex items-center cursor-pointer"
							onClick={() =>
								scrollToSection(
									"hero"
								)
							}
						>
							<span className="text-2xl">
								🦄
							</span>
							<span className="ml-2 font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
								Tiffany's
								Dev
								Portfolio
							</span>
						</div>

						<div className="hidden md:flex space-x-8">
							{[
								"services",
								"portfolio",
								"about",
								"contact",
							].map(
								(
									item
								) => (
									<button
										key={
											item
										}
										onClick={() =>
											scrollToSection(
												item
											)
										}
										className="text-gray-700 hover:text-purple-600 transition-colors capitalize font-medium"
									>
										{
											item
										}
									</button>
								)
							)}
						</div>

						<div className="hidden md:block">
							<button
								onClick={() =>
									scrollToSection(
										"contact"
									)
								}
								className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
							>
								Let's
								Connect
							</button>
						</div>

						<button
							onClick={
								toggleMenu
							}
							className="md:hidden text-gray-700 p-2"
						>
							{isMenuOpen ? (
								<X
									size={
										24
									}
								/>
							) : (
								<Menu
									size={
										24
									}
								/>
							)}
						</button>
					</div>
				</div>

				{isMenuOpen && (
					<div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
						<div className="px-4 py-3 space-y-3">
							{[
								"services",
								"portfolio",
								"about",
								"contact",
							].map(
								(
									item
								) => (
									<button
										key={
											item
										}
										onClick={() =>
											scrollToSection(
												item
											)
										}
										className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 capitalize"
									>
										{
											item
										}
									</button>
								)
							)}
							<button
								onClick={() =>
									scrollToSection(
										"contact"
									)
								}
								className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
							>
								Let's
								Connect
							</button>
						</div>
					</div>
				)}
			</nav>

			<section
				id="hero"
				className="pt-24 pb-12 lg:pt-32 lg:pb-20"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="flex items-center text-pink-500 text-sm font-medium">
								<MapPin
									size={
										16
									}
									className="mr-2"
								/>
								Available
								for
								remote
								work
							</div>

							<div className="space-y-6">
								<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
									Full
									Stack
									Developer
									<br />
									<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
										Building
										Digital
									</span>
									<br />
									<span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
										Experiences
									</span>
								</h1>

								<p className="text-lg text-gray-600 max-w-lg leading-relaxed">
									Crafting
									modern
									web
									applications
									with
									clean
									code,
									thoughtful
									design,
									and
									seamless
									user
									experiences.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<button
									onClick={() =>
										scrollToSection(
											"portfolio"
										)
									}
									className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
								>
									View
									My
									Work
									<ArrowRight
										size={
											20
										}
										className="ml-2 group-hover:translate-x-1 transition-transform"
									/>
								</button>
								<button
									onClick={() =>
										scrollToSection(
											"contact"
										)
									}
									className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-8 py-4 rounded-full hover:from-teal-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									Get
									In
									Touch
								</button>
							</div>

							<div className="flex space-x-6">
								<a
									href="https://github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-purple-600 transition-colors"
								>
									<Github
										size={
											24
										}
									/>
								</a>
								<a
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-600 hover:text-purple-600 transition-colors"
								>
									<Linkedin
										size={
											24
										}
									/>
								</a>
								<a
									href="mailto:hello@example.com"
									className="text-gray-600 hover:text-purple-600 transition-colors"
								>
									<Mail
										size={
											24
										}
									/>
								</a>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -top-8 -right-8 w-32 h-32 opacity-30">
								<div className="grid grid-cols-8 gap-2">
									{[
										...Array(
											64
										),
									].map(
										(
											_,
											i
										) => (
											<div
												key={
													i
												}
												className="w-2 h-2 rounded-full animate-pulse"
												style={{
													background: `linear-gradient(45deg, rgb(168, 85, 247), rgb(236, 72, 153))`,
													animationDelay: `${
														i *
														0.1
													}s`,
												}}
											/>
										)
									)}
								</div>
							</div>

							<div className="relative">
								<div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-purple-200 via-pink-200 to-teal-200 rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
									<div className="w-full h-full bg-gradient-to-br from-purple-100 to-grey-100 flex items-center justify-center">
										<div className="text-purple-600 text-center">
											<div className="text-8xl mb-4">
												<img
													src="/images/TiffanyHall.png"
													alt="Tiffany is a joyful unicorn that loves to knit and code."
													className="w-56 h-68 mx-auto rounded-full object-fit"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				id="services"
				className="py-20 bg-white"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
							What
							I
							Do
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto text-lg">
							I
							specialize
							in
							creating
							end-to-end
							digital
							solutions
							that
							combine
							technical
							excellence
							with
							user-centered
							design
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{services.map(
							(
								service,
								index
							) => (
								<div
									key={
										index
									}
									className="group p-8 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
								>
									<div
										className={`w-14 h-14 bg-gradient-to-r ${
											service.color ===
											"purple"
												? "from-purple-100 to-pink-100"
												: service.color ===
												  "teal"
												? "from-teal-100 to-purple-100"
												: "from-pink-100 to-purple-100"
										} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
									>
										<service.icon
											className={`${
												service.color ===
												"purple"
													? "text-purple-600"
													: service.color ===
													  "teal"
													? "text-teal-600"
													: "text-pink-600"
											}`}
											size={
												24
											}
										/>
									</div>
									<h3 className="font-bold text-gray-900 mb-3 text-center">
										{
											service.title
										}
									</h3>
									<p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
										{
											service.description
										}
									</p>
									<div className="flex flex-wrap gap-2 justify-center">
										{service.technologies.map(
											(
												tech,
												techIndex
											) => (
												<span
													key={
														techIndex
													}
													className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
												>
													{
														tech
													}
												</span>
											)
										)}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</section>

			<section
				id="portfolio"
				className="py-20 bg-gray-50"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
							Featured
							Projects
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto text-lg">
							A
							showcase
							of
							recent
							projects
							demonstrating
							technical
							skills
							and
							creative
							problem-solving
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map(
							(
								project,
								index
							) => (
								<div
									key={
										index
									}
									className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
								>
									<div
										className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
									>
										<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
										<div className="absolute bottom-4 right-4">
											<ExternalLink
												className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												size={
													20
												}
											/>
										</div>
									</div>
									<div className="p-6">
										<h3 className="font-bold text-xl text-gray-900 mb-3">
											{
												project.title
											}
										</h3>
										<p className="text-gray-600 mb-4 leading-relaxed">
											{
												project.description
											}
										</p>
										<div className="flex flex-wrap gap-2">
											{project.tech.map(
												(
													tech,
													techIndex
												) => (
													<span
														key={
															techIndex
														}
														className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
													>
														{
															tech
														}
													</span>
												)
											)}
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</section>

			<footer
				id="contact"
				className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white py-16"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl lg:text-4xl font-bold mb-4">
							Let's
							Build
							Something
							Amazing
						</h2>
						<p className="text-purple-200 text-lg max-w-2xl mx-auto">
							Ready
							to
							bring
							your
							ideas
							to
							life?
							Let's
							discuss
							your
							next
							project.
						</p>
					</div>

					<div className="flex flex-col md:flex-row justify-between items-center mb-12">
						<div className="mb-8 md:mb-0 text-center md:text-left">
							<div className="flex items-center justify-center md:justify-start mb-4">
								<span className="text-3xl mr-3">
									👋
								</span>
								<span className="text-2xl font-bold">
									DevPortfolio
									!
								</span>
							</div>
							<p className="text-purple-200 mb-4">
								Full
								Stack
								Developer,
								Techinical
								Product
								Owner,
								&
								Technical
								Livestream
								and
								Event
								Host
							</p>
							<p className="text-purple-300 text-sm">
								{
									personalInfo.email
								}
							</p>
						</div>

						<div className="flex space-x-6">
							<a
								href={
									personalInfo.github
								}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-white/10 rounded-full text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300"
							>
								<Github
									size={
										24
									}
								/>
							</a>
							<a
								href={
									personalInfo.linkedin
								}
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-white/10 rounded-full text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300"
							>
								<Linkedin
									size={
										24
									}
								/>
							</a>
							<a
								href={
									personalInfo.email
								}
								className="p-3 bg-white/10 rounded-full text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300"
							>
								<Mail
									size={
										24
									}
								/>
							</a>
						</div>
					</div>

					<div className="border-t border-purple-800 pt-8 text-center">
						<p className="text-purple-200 text-sm">
							©
							2025
							tHALL3000
							Crafted
							with
							React
							&
							Tailwind
							CSS.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Portfolio;
