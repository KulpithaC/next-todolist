"use client";

import { useState, useEffect } from "react";

export default function Home() {
  type Task = {
    text: string;
    completed: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error) {
      timeoutId = setTimeout(() => {
        setError("");
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  const addTask = () => {
    if (newTask.trim() === "") {
      setError("Please enter a task before adding");
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
    setError("");
  };

  const toggleCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <h1 className="text-3xl font-extrabold text-white text-center">
            Todo List
          </h1>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="relative">
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
                <div>
                  <strong className="font-bold mr-2">Error:</strong>
                  <span>{error}</span>
                </div>
                <button 
                  onClick={() => setError("")}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-4 items-center">
            <textarea
              rows={1}
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              style={{ minHeight: '50px', maxHeight: '150px' }}
            />
            <button
              onClick={addTask}
              className="bg-indigo-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-indigo-600 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 italic mt-4">
              No tasks yet. Add a task to get started!
            </p>
          ) : (
            <ul className="space-y-3 mt-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <div 
                    onClick={() => toggleCompletion(index)}
                    className="flex items-center space-x-3 cursor-pointer flex-1"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`
                        ${task.completed ? 'text-green-500' : 'text-gray-300'}
                        transition-colors duration-200
                      `}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span 
                      className={`
                        text-black 
                        ${task.completed ? 'line-through text-gray-400' : ''}
                        flex-1
                        whitespace-pre-wrap
                      `}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-600 transition duration-200 ml-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}