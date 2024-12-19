"use client"
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  // const navigate = useNavigate();
  const authToken = JSON.parse(localStorage.getItem('_id')); // Get token from localStorage   
  const userEmail = JSON.parse(localStorage.getItem('email')); // Get token from localStorage   
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/manyTasks?email=${userEmail}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      fetch('/api/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
      })
        .then(response => response.json())
        .then(data => {
          setTasks([...tasks, data]);
          setNewTask('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleEditTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    fetch(`/api/editTask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? data : task));
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleDeleteTask = (id) => {
    fetch(`/api/deleteTask/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    !authToken ?
      <div className="container m-50">
        <section className="panel p-50">
          <div className="m-t-md">
            <input
              type="text"
              className="form-control input-sm"
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{ borderRadius: '4px', padding: '10px' }}
            />
            <button className="btn btn-sm btn-primary mt-2" onClick={handleAddTask}>Add Task</button>
          </div>
          <header className="panel-heading">Details</header>
          <div className="table-responsive">
            <table className="table table-striped b-t text-sm">
              <thead>
                <tr>
                  <th className="th-sortable" data-toggle="class">
                    Task
                    <span className="th-sort">
                      <i className="fa fa-sort-down text"></i>
                      <i className="fa fa-sort-up text-active"></i>
                      <i className="fa fa-sort"></i>
                    </span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.task}</td>
                    <td>
                      <a href="#" onClick={() => handleEditTask(task.id)} className="ml-2">
                        <i className="fa fa-edit text-info" style={{ fontSize: "16px", marginRight: '2px' }}></i>
                      </a>
                      <a href="#" onClick={() => handleDeleteTask(task.id)} className="ml-2">
                        <i className="fa fa-trash-o text-danger" style={{ fontSize: "16px" }}></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            task={taskToEdit}
            onSave={handleUpdateTask}
          />
        )}
      </div>
      : 'You are not autherized to view this page. Please login or register'
  );
}

function Modal({ isOpen, onClose, task, onSave }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleSave = () => {
    onSave(updatedTask);
  };

  return (
    isOpen ? (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={updatedTask.task}
              onChange={(e) => setUpdatedTask({ ...updatedTask, task: e.target.value })}
              className="form-control"
              placeholder="Edit task..."
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    ) : null
  );

}
