import React, { useState, useEffect } from 'react';
import { auth, db } from '../Config/firebaseConfig';
import { doc, setDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Todo = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        await fetchUsername(currentUser.uid);
        await fetchTasks(currentUser.uid);
      } else {
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchUsername = async (userId) => {
    try {
      const userDoc = await doc(db, 'users', userId).get();
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsername(userData.Name); // Adjust to match your Firestore field name
      } else {
        console.error('No username found in Firestore for this user.');
      }
    } catch (err) {
      console.error('Error fetching username:', err.message);
    }
  };

  const fetchTasks = async (userId) => {
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const tasksList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksList);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task.trim() && deadline) {
      try {
        if (editTaskId) {
          await updateDoc(doc(db, 'tasks', editTaskId), {
            task,
            deadline,
          });
          setEditTaskId(null);
        } else {
          await setDoc(doc(db, 'tasks', new Date().toISOString()), {
            task,
            deadline,
            userId: auth.currentUser.uid,
          });
        }
        setTask('');
        setDeadline('');
        fetchTasks(auth.currentUser.uid);
      } catch (err) {
        console.error('Error adding/updating task:', err.message);
      }
    }
  };

  const handleEditTask = (task) => {
    setTask(task.task);
    setDeadline(task.deadline);
    setEditTaskId(task.id);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      fetchTasks(auth.currentUser.uid);
    } catch (err) {
      console.error('Error deleting task:', err.message);
    }
  };

  return (
    <div className='flex h-screen w-full bg-[#2C2C2C] flex-col md:flex-row'>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:flex w-full md:w-[20%] bg-[#1F1F1F] justify-center items-center flex-col p-4`}
      >
        <button
          className='md:hidden absolute top-4 left-4 text-white'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className='text-xl xl:text-2xl flex justify-center items-center text-[#FFFFF0] font-bold'>
          Take Control of Your Day
        </div>
        <div className='flex justify-center items-center mt-3 text-lg font-semibold text-[#708090] ml-9'>
          <p>Stay focused, stay organized, and get things done</p>
        </div>
        <img
          src='todoimage.png'
          alt='image'
          className='flex w-72 h-52 justify-center items-center object-contain'
        />

        {/* Task Input Form */}
        <form onSubmit={handleAddTask} className='mt-6 flex flex-col items-center gap-4'>
          <input
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Task Title'
            className='px-3 py-2 w-full rounded-lg bg-[#3F3F3F] text-white outline-none'
          />
          <input
            type='datetime-local'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className='px-3 py-2 w-full rounded-lg bg-[#3F3F3F] text-white outline-none'
          />
          <button type='submit' className='px-4 py-2 bg-[#7B68EE] rounded-lg hover:bg-[#6A5ACD]'>
            {editTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className='flex flex-col flex-grow'>
        <div className='flex w-full h-24 bg-[#1F1F1F] text-white items-center justify-between px-4 md:justify-end'>
          <button
            className='md:hidden text-white'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h2 className='text-xl font-normal mr-4'>{username}</h2>
          <button onClick={handleLogout} className='px-4 py-2 bg-[#DC143C] rounded-lg hover:bg-[#7B68EE] mr-9'>
            Logout
          </button>
        </div>

        {/* Tasks Display */}
        <div className='flex flex-col p-6 gap-4'>
          {tasks.map((task) => (
            <div key={task.id} className='flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-[#333] rounded-lg'>
              <div>
                <h3 className='text-lg font-semibold text-white'>{task.task}</h3>
                <p className='text-sm text-gray-400'>Deadline: {new Date(task.deadline).toLocaleString()}</p>
              </div>
              <div className='flex gap-2 mt-2 md:mt-0'>
                <button
                  onClick={() => handleEditTask(task)}
                  className='p-2 bg-[#7B68EE] rounded-full hover:bg-[#6A5ACD] text-white'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className='p-2 bg-[#DC143C] rounded-full hover:bg-[#B22222] text-white'
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;

