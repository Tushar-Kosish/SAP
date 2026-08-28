import os
import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, Order, Shipment, RerouteRequest, Notification
from auth import hash_password

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./smartevac_local.db")

# Handle PostgreSQL vs SQLite URL formatting
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    # Test connection
    with engine.connect() as conn:
        pass
    print(f"[Database] Engine connected successfully using: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else 'SQLite local file'}")
except Exception as e:
    print(f"[Database] PostgreSQL connection failed ({e}). Falling back to SQLite local database.")
    DATABASE_URL = "sqlite:///./smartevac_local.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_and_seed_db():
    """Create all tables and seed sample data if database is empty."""
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if users exist
        if db.query(User).count() == 0:
            print("[Database] Seeding initial users, orders, and shipments...")

            # 1. Users
            admin_user = User(
                name="Admin Manager",
                email="admin@smartevac.ai",
                password_hash=hash_password("admin123"),
                role="admin"
            )
            supplier_user = User(
                name="CONCOR Logistics India",
                email="supplier@concor.co.in",
                password_hash=hash_password("supplier123"),
                role="supplier"
            )
            customer_user = User(
                name="Tata Motors Logistics",
                email="customer@tatamotors.com",
                password_hash=hash_password("customer123"),
                role="customer"
            )

            db.add_all([admin_user, supplier_user, customer_user])
            db.commit()
            db.refresh(admin_user)
            db.refresh(supplier_user)
            db.refresh(customer_user)

            # 2. Orders
            order_1 = Order(
                id="ORD-7721",
                customer_id=customer_user.id,
                supplier_id=supplier_user.id,
                product="Industrial Electronics & Auto Components (45 TEU)",
                quantity=45,
                status="In Transit",
                created_at=datetime.datetime.utcnow() - datetime.timedelta(hours=24)
            )
            order_2 = Order(
                id="ORD-7734",
                customer_id=customer_user.id,
                supplier_id=supplier_user.id,
                product="Pharmaceutical Cold Chain Vaccines (30 TEU)",
                quantity=30,
                status="In Transit",
                created_at=datetime.datetime.utcnow() - datetime.timedelta(hours=12)
            )

            db.add_all([order_1, order_2])
            db.commit()

            # 3. Shipments
            shipment_1 = Shipment(
                id="SHP-102",
                order_id=order_1.id,
                current_location="NH48 Highway Km 112 (JNPA Corridor)",
                destination="ICD Dadri (Delhi NCR)",
                current_route="Highway Route A (NH48)",
                estimated_delivery="Tomorrow 18:30",
                status="Delayed"
            )
            shipment_2 = Shipment(
                id="SHP-105",
                order_id=order_2.id,
                current_location="Hazira Port Terminal",
                destination="ICD Tughlakabad",
                current_route="Coastal Barge + Road Link",
                estimated_delivery="Tomorrow 08:00",
                status="In Transit"
            )

            db.add_all([shipment_1, shipment_2])
            db.commit()

            # 4. Reroute Request for SHP-102
            reroute_1 = RerouteRequest(
                id="REROUTE-9482",
                shipment_id=shipment_1.id,
                reason="Severe highway congestion and monsoon landslide blockage detected on NH48 Corridor.",
                proposed_route="WDFC Electric Freight Rail Route B (Rewari Link)",
                status="PENDING",
                created_by="SmartEVAC AI Senser Agent",
                created_at=datetime.datetime.utcnow()
            )

            db.add(reroute_1)
            db.commit()

            # 5. Notifications
            notif_1 = Notification(
                id="NOTIF-01",
                user_id=admin_user.id,
                message="AI Alert: High congestion detected on NH48. Shipment #SHP-102 reroute request generated.",
                type="ALERT",
                is_read=False
            )
            notif_2 = Notification(
                id="NOTIF-02",
                user_id=supplier_user.id,
                message="Fleet Dispatch Request: 45 TEU Containers queued at WDFC Rail Junction.",
                type="REROUTE",
                is_read=False
            )
            notif_3 = Notification(
                id="NOTIF-03",
                user_id=customer_user.id,
                message="Tracking Update: Shipment #SHP-102 experiencing minor delay due to NH48 traffic. Reroute evaluation underway.",
                type="STATUS_CHANGE",
                is_read=False
            )

            db.add_all([notif_1, notif_2, notif_3])
            db.commit()

            print("[Database] Successfully seeded initial demo data.")

    finally:
        db.close()
