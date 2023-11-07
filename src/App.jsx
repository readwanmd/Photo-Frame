import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';
import './App.css';
import SQframe from './assets/frame/SQframe.png';
import SQframe2 from './assets/frame/SQframe2.png';
import SQframe3 from './assets/frame/SQframe3.png';
import SQframe4 from './assets/frame/SQframe4.png';
import frame1 from './assets/frame/frame1.png';
import frame2 from './assets/frame/frame2.png';
import frame3 from './assets/frame/frame3.png';
import frame4 from './assets/frame/frame4.png';
import frame5 from './assets/frame/frame5.png';
import frame6 from './assets/frame/frame6.png';
import frame7 from './assets/frame/frame7.png';

const frames = {
	frame1: {
		id: '01',
		name: 'frame1',
		img: frame1,
		style: {
			top: '99px',
			left: '100px',
			borderRadius: '50%',
			width: '230px',
			height: '230px',
		},
	},
	frame2: {
		id: '02',
		name: 'frame2',
		img: frame2,
	},
	frame3: {
		id: '03',
		name: 'frame3',
		img: frame3,
	},
	frame4: {
		id: '04',
		name: 'frame4',
		img: frame4,
	},
	frame5: {
		id: '05',
		name: 'frame5',
		img: frame5,
	},
	frame6: {
		id: '06',
		name: 'frame6',
		img: frame6,
	},
	frame7: {
		id: '07',
		name: 'frame7',
		img: frame7,
	},
	frame8: {
		id: '08',
		name: 'SQframe',
		img: SQframe,
	},
	frame9: {
		id: '09',
		name: 'SQframe2',
		img: SQframe2,
	},
	frame10: {
		id: '10',
		name: 'SQframe3',
		img: SQframe3,
	},
	frame11: {
		id: '11',
		name: 'SQframe4',
		img: SQframe4,
	},
};

const INIT_STATE = {
	name: '',
	msg: '',
	frame: '/src/assets/frame/frame1.png',
};

function App1() {
	const elementRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [values, setValues] = useState({ ...INIT_STATE });

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setSelectedImage(event.target.result);
			};
			reader.readAsDataURL(file);
		} else {
			setSelectedImage(null);
		}
	};

	const htmlToImageConvert = () => {
		toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = 'my-image-name.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let x = values.frame.split('.')[0].split('/');
	console.log(x[x.length - 1]);

	return (
		<div className="App">
			<form>
				<div className="form-group">
					<label htmlFor="name">Your Name: </label>
					<input
						type="text"
						name="name"
						id="name"
						onChange={handleChange}
						placeholder="Your Name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="msg">Short Message: </label>
					<input
						type="text"
						name="msg"
						id="msg"
						onChange={handleChange}
						placeholder="Short Message"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="frame">Select Frame: </label>
					<select id="frame" name="frame" onChange={handleChange}>
						{Object.keys(frames).map((item) => (
							<option key={frames[item].id} value={frames[item].img}>
								{frames[item].name}
							</option>
						))}
					</select>
				</div>

				<input
					className="file"
					type="file"
					accept="image/*"
					onChange={handleImageChange}
				/>
			</form>

			<div className={`frame`} ref={elementRef}>
				<img src={values.frame} alt="Frame" />
				<img
					className={`user-image ${x[x.length - 1]}`}
					src={selectedImage}
					alt="User"
				/>
				<p className="name">{values?.name}</p>
				<div className="msg">
					<p>{values?.msg}</p>
				</div>
			</div>

			<button onClick={htmlToImageConvert}>Download Image</button>
		</div>
	);
}

export default App1;
