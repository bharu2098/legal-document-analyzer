from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# ==========================================
# Register
# ==========================================
@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """

    try:
        email = user.email.strip().lower()
        username = user.username.strip()

        # Check email
        existing_email = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if existing_email:
            raise HTTPException(
                status_code=400,
                detail="Email already registered.",
            )

        # Check username
        existing_username = (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

        if existing_username:
            raise HTTPException(
                status_code=400,
                detail="Username already exists.",
            )

        # Create user
        new_user = User(
            username=username,
            email=email,
            hashed_password=hash_password(user.password),
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}",
        )


# ==========================================
# Login
# ==========================================
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    """
    Authenticate user and return JWT token.
    """

    try:
        email = user.email.strip().lower()

        db_user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password.",
            )

        if not verify_password(
            user.password,
            db_user.hashed_password,
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password.",
            )

        access_token = create_access_token(
            data={
                "sub": db_user.email,
            }
        )

        return {
            "message": "Login successful.",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": db_user.id,
                "username": db_user.username,
                "email": db_user.email,
            },
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}",
        )