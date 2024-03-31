'use client';
import React, { useEffect, useState } from 'react';
import TreeVisualization from './components/TreeVisualization';

interface Node {
  id: string;
  title: string;
  abstract: string;
  parents: string[];
}

export default function Home() {
  const [dag, setDag] = useState<{ [id: string]: Node }>({});
  const [newSeedTitle, setNewSeedTitle] = useState('');
  const [newSeedAbstract, setNewSeedAbstract] = useState('');

  const handleAddSeedNode = () => {
    if (!newSeedTitle || !newSeedAbstract) return;

    const newSeedNode: Node = {
      id: crypto.randomUUID(),
      title: newSeedTitle,
      abstract: newSeedAbstract,
      parents: [],
    };

    setDag((prevDag) => ({
      ...prevDag,
      [newSeedNode.id]: newSeedNode,
    }));

    setNewSeedTitle('');
    setNewSeedAbstract('');
  };

  const handleAddChildNode = async (parents: Node[]) => {
    const newNode = await generateChildNode(parents);
    setDag((prevDag) => updateDag(prevDag, newNode));
  };

  const generateChildNode = async (parents: Node[]): Promise<Node> => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parents }),
    });
    const data = await response.json();
    const newNode: Node = {
      id: crypto.randomUUID(),
      title: data.title,
      abstract: data.abstract,
      parents: parents.map(parent => parent.id),
    };
    return newNode;
  };

  const updateDag = (dag: { [id: string]: Node }, newNode: Node): { [id: string]: Node } => {
    return {
      ...dag,
      [newNode.id]: newNode,
    };
  };

  const handleRandomGrowth = () => {
    const allNodes = Object.values(dag);
    if (allNodes.length > 1) {
      const numParents = Math.min(3, allNodes.length);
      const parents = [];
      for (let i = 0; i < numParents; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * allNodes.length);
        } while (parents.includes(allNodes[randomIndex]));
        parents.push(allNodes[randomIndex]);
      }
      handleAddChildNode(parents);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="fixed top-4 right-4 z-10">
        <div className="mb-2">
          <input
            type="text"
            value={newSeedTitle}
            onChange={(e) => setNewSeedTitle(e.target.value)}
            placeholder="Enter seed node title"
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <textarea
            value={newSeedAbstract}
            onChange={(e) => setNewSeedAbstract(e.target.value)}
            placeholder="Enter seed node abstract"
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <button
          onClick={handleAddSeedNode}
          className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
        >
          Add Seed Node
        </button>
        <button
          onClick={handleRandomGrowth}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Randomly Grow One Node
        </button>
      </div>
      <div className="h-screen">
        <TreeVisualization data={dag} onAddNode={handleAddChildNode} />
      </div>
    </div>
  );
}