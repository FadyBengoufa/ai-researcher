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
  }
];