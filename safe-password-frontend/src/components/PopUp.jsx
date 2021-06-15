import React from 'react'

const PopUp = ({ title, text, setVisible }) => {

	return (

		<div className="container">

			<section className="popup">
				<svg className="popup-icon" viewBox="0 0 512 512">
					<path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
				</svg>
				<h1 className="popup-titulo">{title}</h1>
				<p className="popup-text">{text}</p>
				<button onClick={() => setVisible(['', 'a', false])} className="popup-button">Ok</button>

			</section>

			<style jsx>{`
			
				.container {
					cursor: auto;
					position: fixed;
					z-index: 1000;
					height: 100vh;
					width: 100%;
					top: 0;
					left: 0;
					background-color: #00000044;
					display: grid;
					justify-content: center;
					align-items: center;
				}

				.popup {
					position: relative;
					width: 500px;
					height: 270px;
					background-color: var(--main-color);
					border-radius: 1rem;
					color: white;
					justify-content: center;
					padding: 2rem;
					box-sizing: border-box;
				}

				.popup-close {
					position: absolute;
					right: 0;
					display: grid;
					justify-content: center;
					background-color: unset;
					width: 30px;
					height: 30px;
					padding: 0;
					margin: 1.5rem;
				}

				.popup-close svg {
					height: 100%;
				}

				.popup-icon {
					margin: auto;
					height: 70px;
				}

				.popup-titulo {
					text-align: center;
					font-size: 2rem
				}

				.popup-text {
					text-align: center

				}

				.popup-button {

				}

			
			`}</style>
		</div>

	)
}

export default PopUp
