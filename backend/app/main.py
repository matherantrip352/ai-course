# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.core.config import settings
# from app.api.routes import router as api_router
# from app.db.session import engine, Base
# from sqlalchemy import select
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.db.session import AsyncSessionLocal
# from app.models.quiz import Question
# from sqlalchemy import text
# import asyncio


# app = FastAPI(title=settings.app_name)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.cors_origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(api_router, prefix="/api")


# @app.get("/")
# async def root():
#     return {"message": "AI Mini Course API"}


# @app.on_event("startup")
# async def on_startup():
#     # Ensure tables via SQL (aligns with existing schema: option_a..option_d)
#     ddl_statements = [
#         # users table to store registered emails and full_name
#         """
#         CREATE TABLE IF NOT EXISTS users (
#             id SERIAL PRIMARY KEY,
#             email VARCHAR(255) UNIQUE NOT NULL,
#             full_name VARCHAR(255)
#         );
#         """,
#         # OTP records
#         """
#         CREATE TABLE IF NOT EXISTS email_otps (
#             id SERIAL PRIMARY KEY,
#             email VARCHAR(255) NOT NULL,
#             code VARCHAR(6) NOT NULL,
#             expires_at TIMESTAMPTZ NOT NULL,
#             consumed BOOLEAN DEFAULT FALSE
#         );
#         """,
#         # questions bank with discrete option columns
#         """
#         CREATE TABLE IF NOT EXISTS questions (
#             id SERIAL PRIMARY KEY,
#             text TEXT NOT NULL,
#             option_a TEXT NOT NULL,
#             option_b TEXT NOT NULL,
#             option_c TEXT NOT NULL,
#             option_d TEXT NOT NULL,
#             correct INTEGER NOT NULL
#         );
#         """,
#         # quiz attempts
#         """
#         CREATE TABLE IF NOT EXISTS quiz_attempts (
#             id SERIAL PRIMARY KEY,
#             email VARCHAR(255) NOT NULL,
#             total_questions INTEGER NOT NULL,
#             correct_answers INTEGER NOT NULL,
#             passed BOOLEAN DEFAULT FALSE,
#             created_at TIMESTAMPTZ DEFAULT NOW()
#         );
#         """,
#         # answers
#         """
#         CREATE TABLE IF NOT EXISTS attempt_answers (
#             id SERIAL PRIMARY KEY,
#             attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
#             question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
#             selected_index INTEGER NOT NULL,
#             is_correct BOOLEAN NOT NULL
#         );
#         """,
#     ]

#     async with engine.begin() as conn:
#         for ddl in ddl_statements:
#             await conn.execute(text(ddl))
#         # Also run SQLAlchemy metadata create_all as a no-op safety
#         await conn.run_sync(Base.metadata.create_all)

#     # Seed sample questions if empty
#     async with AsyncSessionLocal() as session:  # type: AsyncSession
#         res = await session.execute(select(Question).limit(1))
#         if res.scalar_one_or_none() is None:
#             samples = [
#                 Question(
#                     text="Which of the following is true about Deep Learning?",
#                     option_a="It doesn’t need training data",
#                     option_b="It only works with text",
#                     option_c="It uses neural networks with multiple layers",
#                     option_d="It’s faster but less accurate than rule-based systems",
#                     correct=2,
#                 ),
#                 Question(
#                     text="In a UPI fraud detection model, which ML approach is typically used?",
#                     option_a="Reinforcement learning",
#                     option_b="Supervised learning",
#                     option_c="Prompt engineering",
#                     option_d="RAG",
#                     correct=1,
#                 ),
#                 Question(
#                     text="What is the primary purpose of a Model Context Protocol (MCP)?",
#                     option_a="Encrypt prompts",
#                     option_b="Increase token limits",
#                     option_c="Provide structured context to AI models",
#                     option_d="Speed up training",
#                     correct=2,
#                 ),
#             ]
#             session.add_all(samples)
#             await session.commit()





from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router as api_router
from app.db.session import engine, Base
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import AsyncSessionLocal
from app.models.quiz import Question
from sqlalchemy import text
import asyncio


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "NPCI AI Learning Platform API"}


@app.on_event("startup")
async def on_startup():
    # Ensure tables via SQL (aligns with existing schema: option_a..option_d)
    ddl_statements = [ 
        # users table to store registered emails and full_name
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            full_name VARCHAR(255)
        );
        """,
        # OTP records
        """
        CREATE TABLE IF NOT EXISTS email_otps (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            code VARCHAR(6) NOT NULL,
            expires_at TIMESTAMPTZ NOT NULL,
            consumed BOOLEAN DEFAULT FALSE
        );
        """,
        # questions bank with discrete option columns
        """
        CREATE TABLE IF NOT EXISTS questions (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            correct INTEGER NOT NULL
        );
        """,
        # quiz attempts
        """
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            total_questions INTEGER NOT NULL,
            correct_answers INTEGER NOT NULL,
            passed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        """,
        # answers
        """
        CREATE TABLE IF NOT EXISTS attempt_answers (
            id SERIAL PRIMARY KEY,
            attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
            question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
            selected_index INTEGER NOT NULL,
            is_correct BOOLEAN NOT NULL
        );
        """,
    ]

    async with engine.begin() as conn:
        for ddl in ddl_statements:
            await conn.execute(text(ddl))
        # Also run SQLAlchemy metadata create_all as a no-op safety
        await conn.run_sync(Base.metadata.create_all)

    # Seed sample questions if empty
    async with AsyncSessionLocal() as session:  # type: AsyncSession
        res = await session.execute(select(Question).limit(1))
        if res.scalar_one_or_none() is None:
            samples = [
                Question(
                    text="Which of the following is true about Deep Learning?",
                    option_a="It doesn't need training data",
                    option_b="It only works with text",
                    option_c="It uses neural networks with multiple layers",
                    option_d="It's faster but less accurate than rule-based systems",
                    correct=2,
                ),
                Question(
                    text="In a UPI fraud detection model, which ML approach is typically used?",
                    option_a="Reinforcement learning",
                    option_b="Supervised learning",
                    option_c="Prompt engineering",
                    option_d="RAG",
                    correct=1,
                ),
                Question(
                    text="What is the primary purpose of a Model Context Protocol (MCP)?",
                    option_a="Encrypt prompts",
                    option_b="Increase token limits",
                    option_c="Provide structured context to AI models",
                    option_d="Speed up training",
                    correct=2,
                ),
                Question(
                    text="What does AI stand for?",
                    option_a="Artificial Intelligence",
                    option_b="Automatic Information",
                    option_c="Advanced Integration",
                    option_d="Application Interface",
                    correct=0,
                ),
                Question(
                    text="Which type of learning requires labeled training data?",
                    option_a="Unsupervised learning",
                    option_b="Reinforcement learning",
                    option_c="Supervised learning",
                    option_d="Semi-supervised learning",
                    correct=2,
                ),
                Question(
                    text="What is the main advantage of RAG (Retrieval Augmented Generation)?",
                    option_a="It reduces model size",
                    option_b="It provides up-to-date information",
                    option_c="It speeds up training",
                    option_d="It reduces computational cost",
                    correct=1,
                ),
                Question(
                    text="In financial services, what is KYC?",
                    option_a="Key Yield Calculation",
                    option_b="Know Your Customer",
                    option_c="Kinetic Year Cycle",
                    option_d="Key Year Component",
                    correct=1,
                ),
                Question(
                    text="Which AI technique is commonly used for fraud detection?",
                    option_a="Anomaly detection",
                    option_b="Text summarization",
                    option_c="Image generation",
                    option_d="Speech synthesis",
                    correct=0,
                ),
                Question(
                    text="What is the difference between AI and ML?",
                    option_a="They are the same thing",
                    option_b="AI is broader, ML is a subset of AI",
                    option_c="ML is broader, AI is a subset of ML",
                    option_d="They are completely unrelated",
                    correct=1,
                ),
                Question(
                    text="Which of the following is an example of supervised learning?",
                    option_a="Clustering customers into groups",
                    option_b="Predicting house prices based on features",
                    option_c="Finding patterns in unlabeled data",
                    option_d="Playing chess without human guidance",
                    correct=1,
                ),
                Question(
                    text="What is the purpose of feature engineering in ML?",
                    option_a="To reduce the size of the dataset",
                    option_b="To create or modify input variables for better model performance",
                    option_c="To visualize the data",
                    option_d="To clean the data",
                    correct=1,
                ),
                Question(
                    text="In the context of AI, what is 'inference'?",
                    option_a="Training a model on new data",
                    option_b="Using a trained model to make predictions",
                    option_c="Collecting training data",
                    option_d="Evaluating model accuracy",
                    correct=1,
                ),
                Question(
                    text="What is AML in financial services?",
                    option_a="Artificial Machine Learning",
                    option_b="Anti-Money Laundering",
                    option_c="Advanced Modeling Language",
                    option_d="Automatic Monitoring Logic",
                    correct=1,
                ),
                Question(
                    text="Which technique is best for processing unstructured text data?",
                    option_a="Linear regression",
                    option_b="Natural Language Processing (NLP)",
                    option_c="Image recognition",
                    option_d="Time series analysis",
                    correct=1,
                ),
                Question(
                    text="What is the main benefit of using AI agents in financial services?",
                    option_a="They can replace all human employees",
                    option_b="They can automate repetitive tasks and provide 24/7 service",
                    option_c="They eliminate the need for data",
                    option_d="They guarantee 100% accuracy",
                    correct=1,
                ),
            ]
            session.add_all(samples)
            await session.commit()
