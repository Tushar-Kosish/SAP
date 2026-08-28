import datetime
from typing import Optional, List
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Float, Text
from sqlalchemy.orm import declarative_base, relationship
from pydantic import BaseModel, EmailStr

Base = declarative_base()

# ==========================================
# SQLAlchemy ORM Models
# ==========================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="customer")  # admin, supplier, customer
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    customer_orders = relationship("Order", foreign_keys="Order.customer_id", back_populates="customer")
    supplier_orders = relationship("Order", foreign_keys="Order.supplier_id", back_populates="supplier")
    notifications = relationship("Notification", back_populates="user")


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(100), primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    product = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    status = Column(String(50), nullable=False, default="Pending")  # Pending, Assigned, In Transit, Rerouted, Delivered
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    customer = relationship("User", foreign_keys=[customer_id], back_populates="customer_orders")
    supplier = relationship("User", foreign_keys=[supplier_id], back_populates="supplier_orders")
    shipment = relationship("Shipment", back_populates="order", uselist=False)


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(String(100), primary_key=True, index=True)
    order_id = Column(String(100), ForeignKey("orders.id"), nullable=False, unique=True)
    current_location = Column(String(255), nullable=False)
    destination = Column(String(255), nullable=False)
    current_route = Column(String(255), nullable=False)
    estimated_delivery = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False, default="In Transit")  # Scheduled, In Transit, Delayed, Rerouted, Delivered

    # Relationships
    order = relationship("Order", back_populates="shipment")
    reroute_requests = relationship("RerouteRequest", back_populates="shipment")


class RerouteRequest(Base):
    __tablename__ = "reroute_requests"

    id = Column(String(100), primary_key=True, index=True)
    shipment_id = Column(String(100), ForeignKey("shipments.id"), nullable=False)
    reason = Column(Text, nullable=False)
    proposed_route = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False, default="PENDING")  # PENDING, APPROVED, REJECTED
    created_by = Column(String(255), nullable=False, default="AI Agent System")
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    shipment = relationship("Shipment", back_populates="reroute_requests")
    approver = relationship("User", foreign_keys=[approved_by])


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String(100), primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), nullable=False, default="ALERT")  # ALERT, REROUTE, STATUS_CHANGE, ORDER
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="notifications")


# ==========================================
# Pydantic Schemas for API Requests & Responses
# ==========================================

class UserRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "customer"  # admin, supplier, customer


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    name: str
    email: str
    role: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    product: str
    quantity: int
    supplier_id: Optional[int] = None
    destination: Optional[str] = "ICD Dadri (Delhi NCR)"


class OrderOut(BaseModel):
    id: str
    customer_id: int
    customer_name: Optional[str] = None
    supplier_id: Optional[int] = None
    supplier_name: Optional[str] = None
    product: str
    quantity: int
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class ShipmentUpdateStatus(BaseModel):
    status: str
    current_location: Optional[str] = None


class ShipmentOut(BaseModel):
    id: str
    order_id: str
    current_location: str
    destination: str
    current_route: str
    estimated_delivery: str
    status: str
    customer_name: Optional[str] = None
    supplier_name: Optional[str] = None
    product: Optional[str] = None
    quantity: Optional[int] = None

    class Config:
        from_attributes = True


class RerouteRequestCreate(BaseModel):
    shipment_id: str
    reason: str
    proposed_route: Optional[str] = None
    custom_prompt: Optional[str] = None


class RerouteRequestOut(BaseModel):
    id: str
    shipment_id: str
    reason: str
    proposed_route: str
    status: str
    created_by: str
    approved_by: Optional[int] = None
    created_at: datetime.datetime
    shipment_current_route: Optional[str] = None

    class Config:
        from_attributes = True


class NotificationOut(BaseModel):
    id: str
    user_id: int
    message: str
    type: str
    is_read: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True
