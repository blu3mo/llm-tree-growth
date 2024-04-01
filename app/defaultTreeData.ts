import { Node } from './Node';

const defaultTreeData: { [id: string]: Node } = {
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
};

export default defaultTreeData;