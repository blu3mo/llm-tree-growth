// pages/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import TreeVisualization from './components/TreeVisualization';
import defaultTreeData from './defaultTreeData';
import { Node } from './Node';
import { countDescendants, sumDescendantsEvaluations } from './utils/treeUtils';
import { selectParentsByMCTS } from './utils/mctsUtils';
import SeedNodeForm from './components/SeedNodeForm';
import { useInterval } from './utils/useInterval';

export default function Home() {
  const [dag, setDag] = useState<{ [id: string]: Node }>(defaultTreeData);
  const [showSeedForm, setShowSeedForm] = useState(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [evaluationData, setEvaluationData] = useState<{ nodeId: string; evaluation: number }[]>([]);

  const handleShowSeedForm = () => {
    setShowSeedForm(true);
  };

  const handleHideSeedForm = () => {
    setShowSeedForm(false);
  };

  const handleAddSeedNode = (newSeedNode: Node) => {
    setDag((prevDag) => ({
      ...prevDag,
      [newSeedNode.id]: newSeedNode,
    }));
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

  useInterval(() => {
    if (isAutoGenerating) {
      console.log('Auto-generating child node...');
      handleAddChildNode();
    }
  }, isAutoGenerating ? 3000 : null);

  const handleAddChildNode = async () => {
    try {
      const newNode = await generateChildNode();
      setDag((prevDag) => updateDag(prevDag, newNode));
      setEvaluationData((prevData) => [...prevData, { nodeId: newNode.id, evaluation: newNode.evaluation }]);
    } catch (error) {
      console.error('Error generating child node:', error);
      alert('No available parent candidates. Please add more seed nodes or evaluate existing nodes.');
    }
  };

  const generateChildNode = async (): Promise<Node> => {
    const allNodes = Object.values(dag);
    const parentCandidates = allNodes.map((node) => ({
      ...node,
      numDescendants: countDescendants(dag, node.id),
      sumEvaluations: sumDescendantsEvaluations(dag, node.id),
    }));

    if (parentCandidates.length === 0) {
      throw new Error('No available parent candidates');
    }

    const parents = selectParentsByMCTS(parentCandidates, 3);
    const criteria = "Robotics-related are good. Non-robotics related are bad"//"Novelty, Interestingness, Realisticness";

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parents, criteria }),
    });
    const data = await response.json();
    const newNode: Node = {
      id: crypto.randomUUID(),
      title: data.title,
      abstract: data.abstract,
      parents: parents.map(parent => parent.id),
      children: [],
      evaluation: data.score,
    };
    parents.forEach(parent => {
      parent.children.push(newNode.id);
    });
    return newNode;
  };

  const updateDag = (dag: { [id: string]: Node }, newNode: Node): { [id: string]: Node } => {
    return {
      ...dag,
      [newNode.id]: newNode,
    };
  };

  useEffect(() => {
    if (evaluationData.length > 0) {
      const csvData = evaluationData.map(({ nodeId, evaluation }) => `${nodeId},${evaluation}`).join('\n');
      console.log('Evaluation Data CSV:\n' + csvData);
    }
  }, [evaluationData]);

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
            <button
              onClick={() => setIsAutoGenerating(!isAutoGenerating)}
              className={`bg-yellow-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 transition duration-200 ${
                isAutoGenerating ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-yellow-600'
              }`}
            >
              <span>{isAutoGenerating ? 'Stop' : 'Auto Generate'}</span>
            </button>
          </div>
        </div>
        {showSeedForm && (
          <SeedNodeForm
            onAddSeedNode={handleAddSeedNode}
            onCancel={handleHideSeedForm}
          />
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