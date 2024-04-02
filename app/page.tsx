// pages/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import TreeVisualization from './components/TreeVisualization';
import { paperDefaultNodes, storyPlotDefaultNodes, historyDefaultNodes } from "./defaultNodes";
import { Node } from './Node';
import { countDescendants, sumDescendantsEvaluations } from './utils/treeUtils';
import { selectParentsByMCTS } from './utils/mctsUtils';
import SeedNodeForm from './components/SeedNodeForm';
import { useInterval } from './utils/useInterval';
import { useSearchParams } from 'next/navigation';

const PARENTS_FACTOR = 2;

export default function Home() {
  const [dag, setDag] = useState<{ [id: string]: Node }>();
  const [showSeedForm, setShowSeedForm] = useState(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [evaluationData, setEvaluationData] = useState<{ nodeId: string; evaluation: number }[]>([]);
  const [criteria, setCriteria] = useState<string>();
  const [instruction, setInstruction] = useState<string>();

  const searchParams = useSearchParams()
  const preset = searchParams.get('preset')

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
      alert('No available parent candidates. Please add more seed nodes.');
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

    const parents = selectParentsByMCTS(parentCandidates, PARENTS_FACTOR);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parents, criteria, instruction }),
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

  useEffect(() => {
    if (preset) {
      // Update criteria and instruction based on the preset
      switch (preset) {
        case 'paper':
          setCriteria(paperDefaultNodes.criteria);
          setInstruction(paperDefaultNodes.instruction);
          setDag(paperDefaultNodes.nodes);
          break;
        case 'story-plot':
          setCriteria(storyPlotDefaultNodes.criteria)
          setInstruction(storyPlotDefaultNodes.instruction);
          setDag(storyPlotDefaultNodes.nodes);
          break;
        // Add more cases for other presets
        case 'history':
          setCriteria(historyDefaultNodes.criteria);
          setInstruction(historyDefaultNodes.instruction);
          setDag(historyDefaultNodes.nodes);
          break;
        default:
          break;
      }
    }
  }, [preset]);

  return (
    <div className="mx-0 p-0 w-full flex">
      <div className="fixed top-4 left-4 h-auto w-96 bg-white bg-opacity-90 rounded-xl shadow-lg p-4 border border-gray-200 backdrop-blur-md z-10 space-y-4">
        <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
            <label htmlFor="instruction" className="text-gray-700 font-semibold">Instruction:</label>
            <textarea
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="criteria" className="text-gray-700 font-semibold">Criteria:</label>
            <textarea
              id="criteria"
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <button
            onClick={handleShowSeedForm}
            className="bg-blue-500 text-white rounded-lg px-6 py-3 flex items-center space-x-2 hover:bg-blue-600 transition duration-200 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-lg font-semibold">Add Seed Node</span>
          </button>
          <button
            onClick={handleAddChildNode}
            className="bg-green-500 text-white rounded-lg px-6 py-3 flex items-center space-x-2 hover:bg-green-600 transition duration-200 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-lg font-semibold">Grow One Child Node</span>
          </button>
          <button
            onClick={() => setIsAutoGenerating(!isAutoGenerating)}
            className={`text-white rounded-lg px-6 py-3 flex items-center space-x-2 transition duration-200 shadow-md ${
              isAutoGenerating ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-yellow-600'
            }`}
          >
            <span className="text-lg font-semibold">{isAutoGenerating ? 'Stop' : 'Auto Generate'}</span>
          </button>
        </div>
      </div>
      {showSeedForm && (
  <div className="fixed top-[290px] left-[420px] z-10">
    <SeedNodeForm
      onAddSeedNode={handleAddSeedNode}
      onCancel={handleHideSeedForm}
    />
  </div>
)}
      <div className="ml-4 w-full h-screen">
        <TreeVisualization
          data={dag}
          onAddNode={handleAddChildNode}
          onUpdateEvaluation={handleUpdateEvaluation}
        />
      </div>
    </div>
  );
}