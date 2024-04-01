import React, { useState } from 'react';
import { Node } from '../Node';

interface SeedNodeFormProps {
  onAddSeedNode: (newSeedNode: Node) => void;
  onCancel: () => void;
}

const SeedNodeForm: React.FC<SeedNodeFormProps> = ({ onAddSeedNode, onCancel }) => {
  const [newSeedTitle, setNewSeedTitle] = useState('');
  const [newSeedAbstract, setNewSeedAbstract] = useState('');

  const handleSubmit = () => {
    if (!newSeedTitle || !newSeedAbstract) return;

    const newSeedNode: Node = {
      id: crypto.randomUUID(),
      title: newSeedTitle,
      abstract: newSeedAbstract,
      parents: [],
      children: [],
      evaluation: 1,
    };

    onAddSeedNode(newSeedNode);
    setNewSeedTitle('');
    setNewSeedAbstract('');
  };

  return (
    <div className="mt-2 bg-white rounded-lg shadow-sm p-4 border-2 border-gray-200">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={newSeedTitle}
          onChange={(e) => setNewSeedTitle(e.target.value)}
          placeholder="Enter seed node title"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
        />
        <textarea
          value={newSeedAbstract}
          onChange={(e) => setNewSeedAbstract(e.target.value)}
          placeholder="Enter seed node abstract"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full h-24"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add
          </button>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition duration-200 focus:outline-none focus:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedNodeForm;