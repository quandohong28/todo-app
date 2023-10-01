import { useRef, useState } from 'react';
import './App.css';

let id = 0;
function App() {
	const [tasks, setTasks] = useState([
		{ id: id++, name: 'Nấu cơm', isActive: false },
		{ id: id++, name: 'Đi tắm', isActive: false },
		{ id: id++, name: 'Quét nhà', isActive: false },
	]);
	const inputRef = useRef(null);

	const handleAdd = () => {
		const name = inputRef.current.value.trim();
		if (name) {
			setTasks([...tasks, { id: id++, name, isActive: false }])
			inputRef.current.value = '';
			inputRef.current.focus();
		}

	}

	const handleDelete = (deleteId) => {
		setTasks(tasks.filter(task => task.id !== deleteId));
	}

	const handleToggleTask = (task) => {
		const index = tasks.indexOf(tasks[task.id]);
		tasks[index].isActive = !tasks[index].isActive;
		setTasks([...tasks]);
	}

	const handleEditTask = (editTask) => {
		const input = document.createElement('input');
		input.value = editTask.name;
		const taskTag = document.querySelector('#task-name');
		console.log(taskTag);
		// taskTag.innerHTML = '';
		// taskTag.appendChild(input);
	}


	return (
		<div className='App bg-[gray] w-[80vw] m-auto mt-[2rem] p-5 rounded text-white'>
			<h1>TODO LIST</h1>
			<div className="header flex justify-evenly p-3">
				<input type="text" ref={inputRef} />
				<button className='bg-blue-200 p-1 rounded' onClick={() => handleAdd()}>Add</button>
			</div>

			<ul>
				{
					tasks.map((task, index) => (
						<li
							key={task.id}
							className='flex justify-between'
						>
							<span
								onDoubleClick={() => handleEditTask(task)}
								onClick={() => handleToggleTask(task)}
								className={''`${task.isActive === true ? 'line-through' : ''}`}
							>
								{task.name}
							</span>
							<span>
								<button onClick={() => handleDelete(task.id)} className='text-red-900 cursor-pointer'>X</button>
							</span>
						</li>
					))
				}
			</ul>

		</div>
	);
}

export default App;
