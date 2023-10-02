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
		input.style.color = 'black';
		const taskTag = document.querySelectorAll('.task-name');
		// console.log(taskTag[editTask.id]);
		taskTag[editTask.id].innerHTML = '';
		taskTag[editTask.id].appendChild(input);
		input.focus();


		input.onblur = () => {
			taskTag[editTask.id].removeChild(input);
			taskTag[editTask.id].innerHTML = input.value;
		}
	}



	return (
		<div className='App border-solid border-2 border-indigo-600x` w-[50vw] h-[80vh] m-auto mt-[2rem] p-[3rem] rounded'>
			<h1 className='font-bold text-4xl mb-5'>TODO LIST</h1>
			<div className="header flex justify-between p-5 bg-[#f1f5f9] rounded mb-5">
				<input type="text" ref={inputRef} className='rounded w-[80%] border-solid border-2 px-4'/>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleAdd()}>Add</button>
			</div>

			<ul className='body justify-between p-5 bg-[#f0fdf4] rounded mt-5'>
				{
					tasks.map((task, index) => (
						<li
							key={task.id}
							className='flex justify-between my-4 bg-[white] p-5 rounded'
						>
							<span
								onDoubleClick={() => handleEditTask(task)}
								onClick={() => handleToggleTask(task)}
								className={`task-name ${task.isActive === true ? 'line-through' : ''}`}
							>
								{task.name}
							</span>
							<span>
								<button onClick={() => handleDelete(task.id)} className='text-white cursor-pointer py-1 px-3 bg-[red] rounded'>x</button>
							</span>
						</li>
					))
				}
			</ul>

		</div>
	);
}

export default App;
