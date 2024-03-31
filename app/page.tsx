'use client';
import React, { useEffect, useState } from 'react';
import TreeVisualization from './components/TreeVisualization';
import { useEdges } from 'reactflow';

interface Node {
  id: string;
  title: string;
  abstract: string;
  children: Node[];
}

export default function Home() {
  const [tree, setTree] = useState<Node>({
    id: 'root',
    title: 'Root',
    abstract: 'Root node',
    children: [],
  });
  const [newSeedTitle, setNewSeedTitle] = useState('');
  const [newSeedAbstract, setNewSeedAbstract] = useState('');

  const handleAddSeedNode = () => {
    if (!newSeedTitle || !newSeedAbstract) return;

    const newSeedNode: Node = {
      id: crypto.randomUUID(),
      title: newSeedTitle,
      abstract: newSeedAbstract,
      children: [],
    };

    // add seed node to tree root child
    setTree((prevTree) => ({
      ...prevTree,
      children: [...prevTree.children, newSeedNode],
    }));

    setNewSeedTitle('');
    setNewSeedAbstract('');
  };

  const handleAddChildNode = async (parentId: string) => {
    const newNode = await generateChildNode(tree, parentId);
    if (newNode) {
      setTree((prevTree) => updateTree(prevTree, parentId, newNode));
    }
  };

  const generateChildNode = async (tree: Node, parentId: string): Promise<Node | null> => {
    if (tree.id === parentId) {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: tree.title, abstract: tree.abstract }),
      });
      const data = await response.json();
      const newNode: Node = {
        id: crypto.randomUUID(),
        title: data.title,
        abstract: data.abstract,
        children: [],
      };
      return newNode;
    }
    // recursively search in childs
    for (const child of tree.children) {
      const newNode = await generateChildNode(child, parentId);
      if (newNode) {
        return newNode;
      }
    }
    return null;
  };

  const updateTree = (tree: Node, parentId: string, newNode: Node): Node => {
    if (tree.id === parentId) {
      return { ...tree, children: [...tree.children, newNode] };
    }
    if (tree.children === undefined) {
      return tree;
    }
    return {
      ...tree,
      children: tree.children.map((child) => updateTree(child, parentId, newNode)),
    };
  };

  const handleRandomGrowth = () => {
    const allNodes = getAllNodes(tree).filter(node => node.id !== "root");
    if (allNodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allNodes.length);
      const randomNodeId = allNodes[randomIndex].id;
      handleAddChildNode(randomNodeId);
    }
  };

  const getAllNodes = (node: Node): Node[] => {
    let nodes: Node[] = [node];
    for (const child of node.children) {
      nodes = nodes.concat(getAllNodes(child));
    }
    return nodes;
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
        <TreeVisualization data={tree} onAddNode={handleAddChildNode} />
      </div>
    </div>
  );
}