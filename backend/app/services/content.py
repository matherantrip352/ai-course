# Backend/app/services/content.py
from typing import Any


COURSE_CONTENT: list[dict[str, Any]] = [
    {
        "id": 1,
        "title": "Module 1: The Language of AI",
        "parts": [
            {
                "title": "Part 1: AI vs ML vs DL", 
                "body": """Artificial Intelligence (AI) is the broad concept of machines being able to carry out tasks in a way that we would consider 'smart'. Machine Learning (ML) is a subset of AI that involves training algorithms to learn patterns from data without being explicitly programmed. Deep Learning (DL) is a subset of ML that uses neural networks with multiple layers to model and understand complex patterns.

In financial services, AI might be a chatbot that can answer customer queries, ML could be a system that detects fraudulent transactions by learning from historical data, and DL might be used for analyzing unstructured data like documents or images for compliance purposes."""
            },
            {
                "title": "Part 2: Types of Learning", 
                "body": """There are three main types of machine learning:

Supervised Learning: Uses labeled training data to learn a mapping from inputs to outputs. Examples include credit scoring (predicting default risk based on customer data) and fraud detection (classifying transactions as legitimate or fraudulent).

Unsupervised Learning: Finds patterns in data without labels. Examples include customer segmentation (grouping customers based on behavior) and anomaly detection (identifying unusual patterns without prior examples).

Reinforcement Learning: Learns through interaction with an environment, receiving rewards or penalties. Examples include algorithmic trading systems and chatbots that improve through user interactions."""
            },
            {
                "title": "Part 3: AI Jargon", 
                "body": """Key terms every financial professional should know:

Model: A mathematical representation of a real-world process, trained on data to make predictions or decisions.

Feature: Individual measurable properties of observed phenomena. In credit scoring, features might include income, age, and credit history.

Label: The correct answer for supervised learning. In fraud detection, the label would be 'fraudulent' or 'legitimate'.

Training: The process of teaching an algorithm using historical data.

Inference: Using a trained model to make predictions on new, unseen data.

Algorithm: A set of rules or instructions for solving a problem. Examples include decision trees, neural networks, and support vector machines."""
            },
        ],
    },
    {
        "id": 2,
        "title": "Module 2: Advanced AI Concepts",
        "parts": [
            {
                "title": "Part 1: AI Agents", 
                "body": """AI Agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional AI that responds to single queries, agents can plan multi-step processes and maintain context across interactions.

In financial services, AI agents can handle complex customer service scenarios, manage investment portfolios by continuously monitoring market conditions, or assist compliance officers by gathering information from multiple sources and preparing comprehensive reports. They excel at tasks requiring sustained attention and multi-step reasoning."""
            },
            {
                "title": "Part 2: Model Context Protocol (MCP)", 
                "body": """Model Context Protocol (MCP) is a standardized way to provide AI models with structured, relevant context to improve their performance and accuracy. Instead of relying solely on training data, MCP allows models to access current, specific information relevant to the task at hand.

In banking, MCP can help AI systems access real-time account information, current regulations, or specific customer history when processing requests. This ensures responses are accurate, up-to-date, and compliant with current policies. MCP bridges the gap between static model knowledge and dynamic business requirements."""
            },
            {
                "title": "Part 3: RAG vs Fine-Tuning", 
                "body": """Retrieval Augmented Generation (RAG) and Fine-Tuning are two approaches to customize AI models for specific use cases:

RAG retrieves relevant information from external databases or documents in real-time and provides this context to the model. It's ideal for scenarios requiring up-to-date information, such as regulatory compliance or current market analysis.

Fine-Tuning involves retraining a model on domain-specific data to specialize its knowledge and behavior. It's better for tasks requiring deep domain expertise, such as specialized financial document analysis or industry-specific language understanding.

Choose RAG when information changes frequently and accuracy is critical. Choose fine-tuning when you need specialized behavior and have sufficient domain-specific training data."""
            },
        ],
    },
    {
        "id": 3,
        "title": "Module 3: AI in Financial Services",
        "parts": [
            {
                "title": "Credit Scoring & Underwriting", 
                "body": """Modern credit scoring uses machine learning to analyze vast amounts of data beyond traditional credit reports. ML models can incorporate alternative data sources like social media activity, mobile phone usage patterns, and transaction history to assess creditworthiness more accurately.

Supervised learning algorithms like gradient boosting and neural networks can identify complex patterns that traditional scoring methods miss. These models can reduce default rates by 10-20% while enabling loans to previously underserved populations. However, regulatory compliance and explainability remain critical challenges that must be addressed through proper model governance and documentation."""
            },
            {
                "title": "Fraud Detection", 
                "body": """AI-powered fraud detection systems use both supervised and unsupervised learning to identify suspicious activities. Supervised models learn from historical fraud cases to recognize known patterns, while unsupervised models detect anomalies that might indicate new types of fraud.

Real-time systems analyze transaction velocity, location consistency, merchant risk profiles, and behavioral patterns to score transactions within milliseconds. Advanced systems use graph analytics to identify fraud rings and network effects. The key challenge is balancing fraud prevention with customer experience, as overly aggressive systems can frustrate legitimate customers."""
            },
            {
                "title": "Operations & Support", 
                "body": """AI transforms customer service through intelligent chatbots, automated document processing, and agent assistance systems. Natural Language Processing (NLP) enables chatbots to understand customer queries and provide accurate responses, while sentiment analysis helps prioritize urgent cases.

Document AI can extract information from forms, statements, and identification documents, reducing manual processing time by 80%. Agent-assist systems provide real-time suggestions and relevant information to human agents, improving resolution times and consistency. The goal is to handle routine queries automatically while escalating complex issues to human specialists."""
            },
            {
                "title": "KYC, AML & Compliance", 
                "body": """AI streamlines Know Your Customer (KYC) and Anti-Money Laundering (AML) processes through automated document verification, risk assessment, and transaction monitoring. Optical Character Recognition (OCR) extracts information from identity documents, while computer vision verifies document authenticity.

Machine learning models analyze transaction patterns to identify suspicious activities that might indicate money laundering or terrorist financing. Natural Language Processing helps screen news and social media for adverse information about customers. These systems must balance compliance requirements with privacy concerns and regulatory standards."""
            },
            {
                "title": "GenAI in Fintech — Where to Use", 
                "body": """Generative AI excels in content creation, code generation, and conversational interfaces but requires careful implementation in financial services. Best use cases include:

High-value applications: Customer service chatbots, financial report generation, personalized investment advice, and regulatory document analysis. These applications can significantly reduce costs while improving customer experience.

Cautions: Avoid using GenAI for final financial decisions, regulatory calculations, or situations where accuracy is legally mandated. Always implement human oversight, validation mechanisms, and clear disclosure when AI is involved in customer interactions. Consider data privacy and regulatory requirements specific to your jurisdiction."""
            },
        ],
    },
    {"id": 4, "title": "Module 4: Certification Quiz", "parts": []},
]


def list_modules() -> list[dict[str, Any]]:
    return [{"id": m["id"], "title": m["title"]} for m in COURSE_CONTENT]


def get_module(module_id: int) -> dict[str, Any] | None:
    return next((m for m in COURSE_CONTENT if m["id"] == module_id), None)