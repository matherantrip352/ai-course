import random
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.quiz import Question


async def get_random_questions(session: AsyncSession, count: int = 10) -> list[Question]:
    # Fetch all ids then sample
    res = await session.execute(select(Question.id))
    ids = [row[0] for row in res.all()]
    if len(ids) <= count:
        chosen = ids
    else:
        chosen = random.sample(ids, count)

    res2 = await session.execute(select(Question).where(Question.id.in_(chosen)))
    # Keep input order random
    questions = res2.scalars().all()
    random.shuffle(questions)
    return questions


