const btn = {
	width: "50px",
	cursor: "pointer",
	backgroundColor: "#ddd",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "5px"
}

export default {
	container: { display: "flex", justifyContent: "center" },
	todos: {
	  display: "flex",
	  width: "300px",
	  flexDirection: "column",
	  margin: "20px"
	},
	newTask: { width: "300px", display: "flex", marginBottom: "10px" },
	input: { width: "250px", padding: "5px 10px" },
	add: { ...btn },
	todo: { width: "300px", display: "flex", margin: "2px 0" },
	task: {
	  width: "250px",
	  padding: "5px 10px",
	  display: "flex",
	  alignItems: "center",
	  background: "#eee"
	},
	emptyBtn: {
	  width: "50px",
	  backgroundColor: "#ddd",
	  padding: "5px"
	},
	btn: { ...btn }
}
