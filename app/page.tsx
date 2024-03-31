'use client';
import React, { useEffect, useState } from 'react';
import TreeVisualization from './components/TreeVisualization';
import defaultTreeData from './defaultTreeData';

interface Node {
  id: string;
  title: string;
  abstract: string;
  parents: string[];
  evaluation: number;
}

export default function Home() {
  const [dag, setDag] = useState<{ [id: string]: Node }>(defaultTreeData);
  const [newSeedTitle, setNewSeedTitle] = useState('');
  const [newSeedAbstract, setNewSeedAbstract] = useState('');

  const [showSeedForm, setShowSeedForm] = useState(false);

  const handleShowSeedForm = () => {
    setShowSeedForm(true);
  };

  const handleHideSeedForm = () => {
    setShowSeedForm(false);
    setNewSeedTitle('');
    setNewSeedAbstract('');
  };

  const handleAddSeedNode = () => {
    if (!newSeedTitle || !newSeedAbstract) return;

    const newSeedNode: Node = {
      id: crypto.randomUUID(),
      title: newSeedTitle,
      abstract: newSeedAbstract,
      parents: [],
      evaluation: 0.5,
    };

    setDag((prevDag) => ({
      ...prevDag,
      [newSeedNode.id]: newSeedNode,
    }));

    setNewSeedTitle('');
    setNewSeedAbstract('');
  };

  const handleUpdateEvaluation = (nodeId: string, evaluation: number) => {
    setDag((prevDag) => ({
      ...prevDag,
      [nodeId]: {
        ...prevDag[nodeId],
        evaluation,
      },
    }));
  };

  const handleAddChildNode = async () => {
    const newNode = await generateChildNode();
    setDag((prevDag) => updateDag(prevDag, newNode));
  };

  const generateChildNode = async (): Promise<Node> => {
    const allNodes = Object.values(dag);
    const parentCandidates = allNodes.map((node) => ({
      ...node,
      numDescendants: countDescendants(node.id),
      sumEvaluations: sumDescendantsEvaluations(node.id),
    }));

    const parents = selectParentsByMCTS(parentCandidates, 3);

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
      evaluation: 0.5,
    };
    return newNode;
  };

  const updateDag = (dag: { [id: string]: Node }, newNode: Node): { [id: string]: Node } => {
    return {
      ...dag,
      [newNode.id]: newNode,
    };
  };

  const countDescendants = (nodeId: string): number => {
    const node = dag[nodeId];
    if (!node) return 0;

    let count = 0;
    const visitedNodes = new Set<string>();

    const dfs = (currentNodeId: string) => {
      if (visitedNodes.has(currentNodeId)) return;
      visitedNodes.add(currentNodeId);
      count++;

      const currentNode = dag[currentNodeId];
      if (!currentNode) return;

      currentNode.parents.forEach(dfs);
    };

    dfs(nodeId);
    return count;
  };

  const sumDescendantsEvaluations = (nodeId: string): number => {
    const node = dag[nodeId];
    if (!node) return 0;

    let sum = node.evaluation;
    const visitedNodes = new Set<string>();

    const dfs = (currentNodeId: string) => {
      if (visitedNodes.has(currentNodeId)) return;
      visitedNodes.add(currentNodeId);

      const currentNode = dag[currentNodeId];
      if (!currentNode) return;

      sum += currentNode.evaluation;
      currentNode.parents.forEach(dfs);
    };

    dfs(nodeId);
    return sum;
  };

  const selectParentsByMCTS = (nodes: (Node & { numDescendants: number; sumEvaluations: number })[], numParents: number): Node[] => {
    const uctScores = nodes.map((node) => {
      const exploitationTerm = node.sumEvaluations / (node.numDescendants || 1);
      const explorationTerm = Math.sqrt(2 * Math.log(nodes.length) / (node.numDescendants || 1));
      return exploitationTerm + explorationTerm;
    });

    const selectedIndices = Array.from({ length: numParents }, () => 0);
    for (let i = 0; i < numParents; i++) {
      let maxIndex = i;
      for (let j = i + 1; j < nodes.length; j++) {
        if (uctScores[j] > uctScores[maxIndex]) {
          maxIndex = j;
        }
      }
      selectedIndices[i] = maxIndex;
      uctScores[maxIndex] = -Infinity;
    }

    return selectedIndices.map((index) => nodes[index]);
  };

  return (
    <div className="mx-0 p-0 w-full">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white bg-opacity-80 rounded-full shadow-sm p-2 border-2 border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={handleShowSeedForm}
              className="bg-blue-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Seed Node</span>
            </button>
            <button
              onClick={handleAddChildNode}
              className="bg-green-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-green-600 transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Add Child Node</span>
            </button>
          </div>
        </div>
        {showSeedForm && (
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
          onClick={handleAddSeedNode}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Add
        </button>
        <button
          onClick={handleHideSeedForm}
          className="text-gray-500 hover:text-gray-700 transition duration-200 focus:outline-none focus:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      </div>
      <div className="h-screen">
        <TreeVisualization
          data={dag}
          onAddNode={handleAddChildNode}
          onUpdateEvaluation={handleUpdateEvaluation}
        />
      </div>
    </div>
  );
}