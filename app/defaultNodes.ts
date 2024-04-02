import exp from 'constants';
import { Node } from './Node';

export const paperDefaultNodes: { criteria: string, instruction: string, nodes: { [id: string]: Node } } = {
  criteria: "Novelty, Impact, Technical Soundness, Clarity.",
  instruction: "Generate a new paper title and abstract based on the provided examples. Get inspiration from the given content, but make sure to clearly state your novelty and contributions.", nodes: {
    s1: {
      id: 's1',
      title: 'Spacetime: Enabling Fluid Individual and Collaborative Editing in Virtual Reality',
      abstract: 'Virtual Reality enables users to explore content whose physics are only limited by our creativity. Such limitless environments provide us with many opportunities to explore innovative ways to support productivity and collaboration. We present Spacetime, a scene editing tool built from the ground up to explore the novel interaction techniques that empower single user interaction while maintaining fluid multi-user collaboration in immersive virtual environment. We achieve this by introducing three novel interaction concepts: the Container, a new interaction primitive that supports a rich set of object manipulation and environmental navigation techniques, Parallel Objects, which enables parallel manipulation of objects to resolve interaction conflicts and support design workflows, and Avatar Objects, which supports interaction among multiple users while maintaining an individual users\' agency. Evaluated by professional Virtual Reality designers, Spacetime supports powerful individual and fluid collaborative workflows.',
      parents: [],
      children: [],
      evaluation: 1,
    },
    s2: {
      id: 's2',
      title: 'Remixed Reality: Manipulating Space and Time in Augmented Reality',
      abstract: 'We present Remixed Reality, a novel form of mixed reality. In contrast to classical mixed reality approaches where users see a direct view or video feed of their environment, with Remixed Reality they see a live 3D reconstruction, gathered from multipleexternal depth cameras. This approach enables changing the environment as easily as geometry can be changed in virtual reality, while allowing users to view and interact with the actual physical world as they would in aug-mented reality. We characterize a taxonomy of manipula-tions that are possible with Remixed Reality: spatial changessuch as erasing objects; appearance changes such as chang-ing textures; temporal changes such as pausing time; and viewpoint changes that allow users to see the world from dif-ferent points without changing their physical location. Wecontribute a method that uses an underlying voxel grid hold-ing information like visibility and transformations, which is applied to live geometry in real time.',
      parents: [],
      children: [],
      evaluation: 1,
    },
    s3: {
      id: 's3',
      title: 'Comparing Synchronous and Asynchronous Task Delivery in Mixed Reality Environments',
      abstract: 'Asynchronous digital communication is a widely applied and well-known form of information exchange. Most pieces of technology make use of some variation of asynchronous communication systems, be it messaging or email applications. This allows recipients to process digital messages immediately (synchronous) or whenever they have time (asynchronous), meaning that purely digital interruptions can be mitigated easily. Mixed Reality systems have the potential to not only handle digital interruptions but also interruptions in physical space, e.g., caused by co-workers in workspaces or learning environments. However, the benefits of such systems previously remained untested in the context of Mixed Reality. We conducted a user study (N=26) to investigate the impact that the timing of task delivery has on the participants\' performance, workflow, and emotional state. Participants had to perform several cognitively demanding tasks in a Mixed Reality workspace. Inside the virtual workspace, we simulated in-person task delivery either during tasks (i.e., interrupting the participant) or between tasks (i.e., delaying the interruption). Our results show that delaying interruptions has a significant impact on subjective metrics like the perceived performance and workload.',
      parents: [],
      children: [],
      evaluation: 1,
    },
    s4: {
      id: 's4',
      title: 'On the Emergence of Symmetrical Reality',
      abstract: 'Artificial intelligence (AI) has revolutionized human cognitive abilities and facilitated the development of new AI entities capable of interacting with humans in both physical and virtual environments. Despite the existence of virtual reality, mixed reality, and augmented reality for several years, integrating these technical fields remains a formidable challenge due to their disparate application directions. The advent of AI agents, capable of autonomous perception and action, further compounds this issue by exposing the limitations of traditional human-centered research approaches. It is imperative to establish a comprehensive framework that accommodates the dual perceptual centers of humans and AI agents in both physical and virtual worlds. In this paper, we introduce the symmetrical reality framework, which offers a unified representation encompassing various forms of physical-virtual amalgamations. This framework enables researchers to better comprehend how AI agents can collaborate with humans and how distinct technical pathways of physical-virtual integration can be consolidated from a broader perspective. We then delve into the coexistence of humans and AI, demonstrating a prototype system that exemplifies the operation of symmetrical reality systems for specific tasks, such as pouring water. Subsequently, we propose an instance of an AI-driven active assistance service that illustrates the potential applications of symmetrical reality. This paper aims to offer beneficial perspectives and guidance for researchers and practitioners in different fields, thus contributing to the ongoing research about human-AI coexistence in both physical and virtual environments.',
      parents: [],
      children: [],
      evaluation: 1,
    },
    s5: {
      id: 's5',
      title: 'Causality-preserving Asynchronous Reality',
      abstract: 'Mixed Reality is gaining interest as a platform for collaboration and focused work to a point where it may supersede current office settings in future workplaces. At the same time, we expect that interaction with physical objects and face-to-face communication will remain crucial for future work environments, which is a particular challenge in fully immersive Virtual Reality. In this work, we reconcile those requirements through a user\'s individual Asynchronous Reality, which enables seamless physical interaction across time. When a user is unavailable, e.g., focused on a task or in a call, our approach captures co-located or remote physical events in real-time, constructs a causality graph of co-dependent events, and lets immersed users revisit them at a suitable time in a causally accurate way. Enabled by our system AsyncReality, we present a workplace scenario that includes walk-in interruptions during a person\'s focused work, physical deliveries, and transient spoken messages. We then generalize our approach to a use-case agnostic concept and system architecture. We conclude by discussing the implications of Asynchronous Reality for future offices.',
      parents: [],
      children: [],
      evaluation: 1,
    },
    s6: {
      id: 's6',
      title: 'Asynchronously Assigning, Monitoring, and Managing Assembly Goals in Virtual Reality for High-Level Robot Teleoperation',
      abstract: 'We present a prototype virtual reality user interface for robot teleop- eration that supports high-level specification of 3D object positions and orientations in remote assembly tasks. Users interact with vir- tual replicas of task objects. They asynchronously assign multiple goals in the form of 6DoF destination poses without needing to be familiar with specific robots and their capabilities, and manage and monitor the execution of these goals. The user interface employs two different spatiotemporal visualizations for assigned goals: one represents all goals within the user\'s workspace (Aggregated View), while the other depicts each goal within a separate world in miniature (Timeline View). We conducted a user study of the interface without the robot system to compare how these visualizations affect user efficiency and task load. The results show that while the Aggregated View helped the participants finish the task faster, the participants preferred the Timeline View',
      parents: [],
      children: [],
      evaluation: 1,
    },
  }
};

export const storyPlotDefaultNodes: { criteria: string, instruction: string, nodes: { [id: string]: Node } } = {
  criteria: "Engagement, Plot, Characters, Writing Style",
  instruction: "Generate a new fiction story plot based on the provided examples. Get inspiration from the given content, but make sure to create a *new* engaging plot and well-developed characters.",
  nodes: {
    s1: {
      id: 's1',
      title: 'The Last of the Time Travelers',
      abstract: 'In the year 2050, time travel has become a reality. However, the technology is only available to a select few. The protagonist, a young scientist named Alex, discovers that the government has been using time travel to manipulate history. Alex decides to go back in time to stop the government from altering the past. Along the way, Alex meets other time travelers who have their own agendas. Together, they must navigate the dangers of time travel and prevent a catastrophic event that could change the course of history forever.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },
    s2: {
      id: 's2',
      title: 'The Memory Thief',
      abstract: 'In a world where memories can be bought, sold, and traded, a young woman named Olivia discovers she has the ability to steal memories. She becomes entangled in a dangerous underground market, where the wealthy and powerful seek to acquire the memories of others for their own gain. As Olivia delves deeper into this world, she uncovers a sinister plot that threatens to destroy the very fabric of society. With the help of a mysterious ally, Olivia must use her powers to stop the memory thief before it\'s too late.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    s3: {
      id: 's3',
      title: 'The Quantum Conspiracy',
      abstract: 'In the near future, quantum computing has revolutionized the world. But when a renowned quantum physicist is found dead under mysterious circumstances, his former student, Jack, suspects foul play. Jack begins to investigate and uncovers a conspiracy that threatens to use quantum technology for nefarious purposes. With the help of a brilliant hacker named Zoe, Jack must race against time to stop the conspirators before they can unleash a devastating attack that could bring the world to its knees.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    s4: {
      id: 's4',
      title: 'The Immortality Gene',
      abstract: 'In a world where genetic engineering has become commonplace, a young biologist named Liam discovers a gene that could hold the key to immortality. However, when he tries to publish his findings, he finds himself the target of a powerful biotech corporation that will stop at nothing to keep the gene a secret. Liam must go on the run, seeking help from unlikely allies as he tries to expose the truth and prevent the corporation from using the gene for their own nefarious purposes.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    s5: {
      id: 's5',
      title: 'The Phantom Vector',
      abstract: 'In the year 2075, humanity has colonized the solar system. But when a mysterious virus begins to spread among the colonies, causing people to disappear without a trace, a team of scientists and military personnel must race to find a cure. As they investigate, they discover that the virus is actually a sentient entity from another dimension, with the power to manipulate reality itself. The team must find a way to stop the entity before it can consume the entire solar system.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    s6: {
      id: 's6',
      title: 'The Fractal Paradox',
      abstract: 'A brilliant mathematician named Eve discovers a strange pattern in the stock market that seems to predict the future. As she investigates further, she realizes that the pattern is actually a fractal that exists across multiple dimensions. Eve must navigate the dangerous world of high finance and corporate espionage as she tries to unravel the mystery of the fractal paradox. But as she gets closer to the truth, she realizes that the fractal may hold the key to unlocking the very nature of reality itself.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },
  }
};

export const historyDefaultNodes: { criteria: string, instruction: string, nodes: { [id: string]: Node } } = {
  criteria: "Historical Realisticness, Clarity, Relevance",
  instruction: "Imagine and generate a fictional new historical event that would happen *as a consequence* of all the provided events. Make sure to clearly state the historical connection - why and how the provided events will cause your new event. Also explitly state the year of the event.",
  nodes: {
    h1: {
      id: 'h1',
      title: 'The Cuban Missile Crisis (1962)',
      abstract: 'In October 1962, the United States and the Soviet Union came to the brink of nuclear war after the Soviets deployed missiles in Cuba. After a tense 13-day standoff, the crisis was resolved when the Soviets agreed to remove the missiles in exchange for the US removing missiles from Turkey.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h2: {
      id: 'h2',
      title: 'The Civil Rights Act of 1964 (1964)',
      abstract: 'The Civil Rights Act of 1964 was a landmark piece of legislation that outlawed discrimination based on race, color, religion, sex, or national origin. It ended segregation in public places and banned employment discrimination, paving the way for greater equality in the United States.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h3: {
      id: 'h3',
      title: 'The Moon Landing (1969)',
      abstract: 'On July 20, 1969, American astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the moon. The Apollo 11 mission was a major milestone in the Space Race and a defining moment in human history.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h4: {
      id: 'h4',
      title: 'The Fall of the Berlin Wall (1989)',
      abstract: 'On November 9, 1989, the Berlin Wall, which had divided East and West Germany since 1961, was finally opened. The fall of the wall marked the end of the Cold War and the beginning of a new era in European history.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h5: {
      id: 'h5',
      title: 'The Collapse of the Soviet Union (1991)',
      abstract: 'In December 1991, the Soviet Union officially dissolved, ending the Cold War and marking the end of an era. The collapse of the Soviet Union led to the emergence of new independent states and a major shift in global politics.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h6: {
      id: 'h6',
      title: 'The Rwandan Genocide (1994)',
      abstract: 'In 1994, the Rwandan Genocide saw the mass slaughter of an estimated 800,000 to 1 million people, primarily Tutsi, by members of the Hutu ethnic majority. The genocide lasted 100 days and had far-reaching consequences for the region.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h7: {
      id: 'h7',
      title: 'The Oslo Accords (1993)',
      abstract: 'In 1993, the Oslo Accords were signed between Israel and the Palestine Liberation Organization (PLO), marking the first direct, face-to-face agreement between the two parties. The accords aimed to establish a framework for peace and the creation of a Palestinian state.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h9: {
      id: 'h9',
      title: 'The Tiananmen Square Protests (1989)',
      abstract: 'In 1989, student-led protests in Tiananmen Square, Beijing, called for democratic reforms in China. The protests were brutally suppressed by the Chinese government, resulting in an unknown number of deaths and international condemnation.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },

    h10: {
      id: 'h10',
      title: 'The September 11 Attacks (2001)',
      abstract: 'On September 11, 2001, terrorist attacks on the United States killed nearly 3,000 people and led to the "War on Terror". The attacks had far-reaching consequences for global politics and security.',
      parents: [],
      children: [],
      evaluation: 0.5,
    },
  }
}
