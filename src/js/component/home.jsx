import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(()=>{

		fetch('https://playground.4geeks.com/apis/fake/todos/user/frankielee2272')
		
		.then(resp =>  resp.json() // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		)
	
	
		.then(data => {
			// Here is where your code should start after the fetch finishes
			console.log(data); // This will print on the console the exact object received from the server
setTodos(data)
		})
		.catch(error => {
			// Error handling
			console.log(error);
		});
	},[])

	function AddToDo(NewToDo){
		let NewToDoList=[...todos, {label: NewToDo,done:false}]

		fetch('https://playground.4geeks.com/apis/fake/todos/user/frankielee2272', {
			method: "PUT",
			body: JSON.stringify(NewToDoList),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp =>  resp.json() // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		  )
	  
	  
		  .then(data => {
			  // Here is where your code should start after the fetch finishes
			  console.log("Added todo",data); // This will print on the console the exact object received from the server
  setTodos(NewToDoList)
  setInputValue("")
		  })
		  .catch(error => {
			  // Error handling
			  console.log("Error adding todo",error);
		  });
	}

	function DeleteToDo(Index){
		let NewToDoList=todos.filter((todo,currentIndex)=>Index!==currentIndex)

		fetch('https://playground.4geeks.com/apis/fake/todos/user/frankielee2272', {
			method: "PUT",
			body: JSON.stringify(NewToDoList),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp =>  resp.json() // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
		  )
		  .then(data => {
			  // Here is where your code should start after the fetch finishes
			  console.log("Delete todo",data); // This will print on the console the exact object received from the server
              setTodos(NewToDoList)
		  })
		  .catch(error => {
			  // Error handling
			  console.log("Error Deleting todo",error);
		  });
	}

	return (
		<div className="container">
			<h1>
				<em>
					<strong>My Todo List:</strong>
				</em>
			</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								AddToDo(inputValue)
								setInputValue(""); // Clear the input value
							}
						}}
						placeholder="ToDo? "
					/>
				</li>
				{todos.map((t, index) => (
					<li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
						{t.label} 
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" 
						onClick={() =>DeleteToDo(index)}>
							<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
						</svg>
					</li>
				))}
				<div>
					<strong>
						<em>{todos.length} tasks</em>
					</strong>
				</div>
			</ul>
		</div>
	);
};

export default Home;
