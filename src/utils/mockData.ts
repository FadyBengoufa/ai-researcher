import type { Paper } from "../types/paper";

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Transformer Networks in Natural Language Processing',
    authors: ['John Smith', 'Jane Doe'],
    abstract: 'This paper explores the application of transformer networks in various NLP tasks, demonstrating significant improvements in language understanding and generation.',
    year: 2023,
    topics: ['NLP', 'Transformer Networks', 'AI'],
    paperType: 'journal',
    publicationVenue: 'Journal of AI Research',
    citations: 124,
    pdfUrl: '#'
  },
  {
    id: '2',
    title: 'Computer Vision for Medical Imaging',
    authors: ['Alice Johnson', 'Bob Wilson'],
    abstract: 'We present a novel approach to medical image analysis using deep learning techniques, achieving state-of-the-art results in disease detection.',
    year: 2022,
    topics: ['Computer Vision', 'Medical Imaging', 'Deep Learning'],
    paperType: 'conference',
    publicationVenue: 'CVPR',
    citations: 89,
    pdfUrl: '#'
  },
  {
    id: '3',
    title: 'Climate Change Prediction Using Machine Learning',
    authors: ['Carol Davis', 'David Brown'],
    abstract: 'This research applies machine learning models to climate data, improving the accuracy of long-term climate change predictions.',
    year: 2021,
    topics: ['Climate Change', 'Machine Learning', 'Sustainability'],
    paperType: 'journal',
    publicationVenue: 'Nature Climate Change',
    citations: 156,
    pdfUrl: '#'
  },
  {
    id: '4',
    title: 'Advanced Techniques in Reinforcement Learning',
    authors: ['Eva Green', 'Frank White'],
    abstract: 'We introduce new algorithms for reinforcement learning that significantly improve sample efficiency and performance in complex environments.',
    year: 2023,
    topics: ['Reinforcement Learning', 'AI', 'Algorithms'],
    paperType: 'conference',
    publicationVenue: 'ICML',
    citations: 78,
    pdfUrl: '#'
  },
  {
    id: '5',
    title: 'Blockchain Applications in Supply Chain Management',
    authors: ['George Harris', 'Helen Clark'],
    abstract: 'This study examines how blockchain technology can enhance transparency and efficiency in supply chain management systems.',
    year: 2022,
    topics: ['Blockchain', 'Supply Chain', 'Technology'],
    paperType: 'journal',
    publicationVenue: 'Journal of Business Technology',
    citations: 92,
    pdfUrl: '#'
  },
  {
    id: '6',
    title: 'Quantum Computing: Current State and Future Prospects',
    authors: ['Ian Thompson', 'Julia Roberts'],
    abstract: 'A comprehensive review of quantum computing advancements and potential applications across various industries.',
    year: 2023,
    topics: ['Quantum Computing', 'Technology', 'Future Tech'],
    paperType: 'journal',
    publicationVenue: 'Science Journal',
    citations: 145,
    pdfUrl: '#'
  },
  {
    id: '7',
    title: 'Neural Networks for Financial Forecasting',
    authors: ['Kevin Martin', 'Lisa Johnson'],
    abstract: 'Application of deep neural networks to predict stock market trends with improved accuracy over traditional methods.',
    year: 2021,
    topics: ['Neural Networks', 'Finance', 'Predictive Analytics'],
    paperType: 'conference',
    publicationVenue: 'Financial Technology Conference',
    citations: 112,
    pdfUrl: '#'
  },
  {
    id: '8',
    title: 'Ethical Considerations in AI Development',
    authors: ['Michael Brown', 'Nancy Wilson'],
    abstract: 'Examining the ethical implications of AI technologies and proposing frameworks for responsible development.',
    year: 2022,
    topics: ['AI Ethics', 'Responsible AI', 'Technology'],
    paperType: 'journal',
    publicationVenue: 'Ethics in Technology Journal',
    citations: 87,
    pdfUrl: '#'
  },
  {
    id: '9',
    title: 'Natural Language Generation with GPT Models',
    authors: ['Oliver Taylor', 'Patricia Lee'],
    abstract: 'Exploring the capabilities and limitations of GPT models in natural language generation tasks.',
    year: 2023,
    topics: ['NLP', 'GPT', 'Language Models'],
    paperType: 'conference',
    publicationVenue: 'ACL',
    citations: 203,
    pdfUrl: '#'
  },
  {
    id: '10',
    title: 'Computer Vision in Autonomous Vehicles',
    authors: ['Robert Johnson', 'Sarah Miller'],
    abstract: 'Implementation of computer vision systems for object detection and navigation in self-driving cars.',
    year: 2022,
    topics: ['Computer Vision', 'Autonomous Vehicles', 'AI'],
    paperType: 'journal',
    publicationVenue: 'Automotive Technology Review',
    citations: 134,
    pdfUrl: '#'
  }
];

export const getAvailableTopics = (): string[] => {
  const allTopics = mockPapers.flatMap(paper => paper.topics);
  return Array.from(new Set(allTopics));
};

export const getAvailableYears = (): number[] => {
  const allYears = mockPapers.map(paper => paper.year);
  return Array.from(new Set(allYears)).sort((a, b) => b - a);
};

export const getAvailableAuthors = (): string[] => {
  const allAuthors = mockPapers.flatMap(paper => paper.authors);
  return Array.from(new Set(allAuthors));
};

export const getAvailablePaperTypes = (): string[] => {
  const allTypes = mockPapers.map(paper => paper.paperType);
  return Array.from(new Set(allTypes));
};