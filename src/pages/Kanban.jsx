import React, { useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { MdAdd, MdClose } from 'react-icons/md';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

const Kanban = () => {
  const [tasks, setTasks] = useState(kanbanData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    Id: '',
    Title: '',
    Summary: '',
    Status: 'Open',
    Type: 'Story',
    Priority: 'Normal',
    Assignee: '',
    Tags: '',
    Estimate: 0,
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-normal'
  });

  // Generate new task ID
  const generateTaskId = () => {
    const maxId = Math.max(...tasks.map(task => parseInt(task.Id.replace('Task ', ''))), 0);
    return `Task ${maxId + 1}`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.Summary.trim()) return;

    const taskToAdd = {
      ...newTask,
      Id: generateTaskId(),
      Title: `Task - ${Date.now()}`,
      Status: 'Open', // Always add to "To Do" column
      RankId: tasks.length + 1,
      ClassName: `e-${newTask.Type.toLowerCase()}, e-${newTask.Priority.toLowerCase()}, e-${newTask.Assignee.toLowerCase().replace(' ', '-')}`
    };

    setTasks(prev => [...prev, taskToAdd]);
    
    // Reset form
    setNewTask({
      Id: '',
      Title: '',
      Summary: '',
      Status: 'Open',
      Type: 'Story',
      Priority: 'Normal',
      Assignee: '',
      Tags: '',
      Estimate: 0,
      RankId: 1,
      Color: '#02897B',
      ClassName: 'e-story, e-normal'
    });
    setShowAddForm(false);
  };

  // Cancel adding task
  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewTask({
      Id: '',
      Title: '',
      Summary: '',
      Status: 'Open',
      Type: 'Story',
      Priority: 'Normal',
      Assignee: '',
      Tags: '',
      Estimate: 0,
      RankId: 1,
      Color: '#02897B',
      ClassName: 'e-story, e-normal'
    });
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <Header category="App" title="Kanban" />
        
        {/* Add Task Button */}
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <MdAdd className="text-lg" />
          Add Task
        </button>
      </div>

      {/* Add Task Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Task</h3>
              <button
                type="button"
                onClick={handleCancelAdd}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              {/* Task Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Summary *
                </label>
                <input
                  type="text"
                  id="summary"
                  name="Summary"
                  value={newTask.Summary}
                  onChange={handleInputChange}
                  placeholder="Enter task summary..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Task Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="Type"
                  value={newTask.Type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Story">Story</option>
                  <option value="Bug">Bug</option>
                  <option value="Epic">Epic</option>
                  <option value="Improvement">Improvement</option>
                  <option value="Task">Task</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="Priority"
                  value={newTask.Priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Assignee */}
              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <input
                  type="text"
                  id="assignee"
                  name="Assignee"
                  value={newTask.Assignee}
                  onChange={handleInputChange}
                  placeholder="Assign to..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="Tags"
                  value={newTask.Tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma separated)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Estimate */}
              <div>
                <label htmlFor="estimate" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimate (hours)
                </label>
                <input
                  type="number"
                  id="estimate"
                  name="Estimate"
                  value={newTask.Estimate}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={tasks}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
