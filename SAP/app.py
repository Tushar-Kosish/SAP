import io
import os
import random
import datetime
from flask import Flask, jsonify, request, Response, send_file
from flask_cors import CORS
from database import init_db, get_db_connection
from auth import generate_token, decode_token
from agents import EvacuationAgent, multi_agent_system
from sap_tm_client import SAPTMClient, sap_client
from pdf_generator import generate_concor_rail_booking_pdf, generate_customs_prefiling_pdf
from ai_rerouting import ai_engine

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app = Flask(__name__)
CORS(app, origins=allowed_origins)

# Initialize SQLite database tables
init_db()

agent = EvacuationAgent("Agent-Alpha", "Port-North")

# ==========================================
# User Required Core Endpoints
# ==========================================

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get("username", "")
    role = "Admin" if "admin" in username.lower() else "Supplier"
    token = generate_token(username, role)

    # Log action to database
    try:
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO audit_logs (timestamp, action, user, details) VALUES (?, ?, ?, ?)",
            (datetime.datetime.now().isoformat(), "USER_LOGIN", username, f"Role: {role}")
        )
        conn.commit()
        conn.close()
    except Exception:
        pass

    return jsonify({"token": token, "role": role, "username": username})

@app.route('/api/sap/orders', methods=['GET'])
def get_sap_orders():
    orders = sap_client.fetch_transport_orders()
    return jsonify(orders)

@app.route('/api/agents/status', methods=['GET'])
def agent_status():
    decision, action_required = agent.evaluate_congestion(weather_severity=8.2, gate_queue_hours=5.0)
    return jsonify({
        "agentId": agent.agent_id,
        "region": agent.region,
        "decision": decision,
        "actionRequired": action_required
    })

# ==========================================
# Real-Time Telemetry & Simulation API
# ==========================================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OPERATIONAL",
        "system": "SmartEvac AI SAP BTP Engine",
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    return jsonify({
        "containersInTransit": 1248,
        "activeShipments": 87,
        "currentDisruptions": 3,
        "averageDelayHours": 4.7,
        "costExposureLakhs": 18.4,
        "co2ExposureTons": 12.8
    })

@app.route('/api/disruption', methods=['GET'])
def get_disruption():
    return jsonify({
        "id": "DISRUPT-8492",
        "title": "CONGESTION DETECTED",
        "corridor": "JNPA → Delhi Freight Corridor (NH48 Highway)",
        "congestionScore": 82,
        "severity": "CRITICAL",
        "trafficDensity": "High",
        "portDwellTimeIncreasePercent": 31,
        "expectedDelayHours": 8.2,
        "confidencePercent": 94,
        "timestamp": "Just Now",
        "location": [19.065, 73.001]
    })

@app.route('/api/simulate', methods=['POST'])
def run_simulation():
    data = request.json or {}
    container_data = data.get("container", {
        "id": "MSCU-948201",
        "type": "Standard 40ft TEU",
        "destination": "ICD Dadri",
        "dwell_days": 5
    })
    congestion_score = data.get("congestion_score", 82)
    result = multi_agent_system.run_evacuation_crew(container_data, congestion_score)
    return jsonify(result)

@app.route('/multimodal-comparison', methods=['GET'])
def get_multimodal_comparison():
    distance_km = request.args.get('distance_km', default=1200, type=int)
    return jsonify(ai_engine.calculate_multimodal_metrics(distance_km=distance_km))

# ==========================================
# Authentication & User Session Endpoints
# ==========================================

@app.route('/auth/register', methods=['POST'])
def auth_register():
    data = request.json or {}
    email = data.get("email", "user@smartevac.ai")
    name = data.get("name", "User")
    role = data.get("role", "customer").lower()
    token = generate_token(email, role)
    return jsonify({
        "access_token": token,
        "token_type": "bearer",
        "user_id": random.randint(100, 999),
        "name": name,
        "email": email,
        "role": role
    }), 201

@app.route('/auth/login', methods=['POST'])
def auth_login():
    data = request.json or {}
    email = data.get("email", "admin@smartevac.ai")
    role = "admin" if "admin" in email.lower() else ("supplier" if "supplier" in email.lower() else "customer")
    name = email.split('@')[0].replace('.', ' ').title()
    token = generate_token(email, role)
    return jsonify({
        "access_token": token,
        "token_type": "bearer",
        "user_id": 1,
        "name": name,
        "email": email,
        "role": role
    })

@app.route('/auth/logout', methods=['POST'])
def auth_logout():
    return jsonify({"message": "Successfully logged out"})

@app.route('/auth/me', methods=['GET'])
def auth_me():
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    decoded = decode_token(token) if token else None
    return jsonify({
        "id": 1,
        "name": decoded.get("sub", "Admin Manager") if decoded else "Admin Manager",
        "email": "admin@smartevac.ai",
        "role": decoded.get("role", "admin").lower() if decoded else "admin"
    })

# ==========================================
# Orders & Shipments Management Endpoints
# ==========================================

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify([
        {
            "id": "ORD-7721",
            "customer_id": 3,
            "customer_name": "Tata Motors Logistics",
            "supplier_id": 2,
            "supplier_name": "CONCOR Logistics India",
            "product": "Industrial Electronics & Auto Components (45 TEU)",
            "quantity": 45,
            "status": "In Transit",
            "created_at": (datetime.datetime.utcnow() - datetime.timedelta(hours=24)).isoformat()
        },
        {
            "id": "ORD-7734",
            "customer_id": 3,
            "customer_name": "Tata Motors Logistics",
            "supplier_id": 2,
            "supplier_name": "CONCOR Logistics India",
            "product": "Pharmaceutical Cold Chain Vaccines (30 TEU)",
            "quantity": 30,
            "status": "In Transit",
            "created_at": (datetime.datetime.utcnow() - datetime.timedelta(hours=12)).isoformat()
        }
    ])

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json or {}
    order_id = f"ORD-{random.randint(1000, 9999)}"
    return jsonify({
        "id": order_id,
        "customer_id": 3,
        "customer_name": "Customer User",
        "supplier_id": 2,
        "supplier_name": "CONCOR Logistics India",
        "product": data.get("product", "General Cargo"),
        "quantity": data.get("quantity", 10),
        "status": "In Transit",
        "created_at": datetime.datetime.utcnow().isoformat()
    }), 201

@app.route('/shipments', methods=['GET'])
def get_shipments():
    return jsonify([
        {
            "id": "SHP-102",
            "order_id": "ORD-7721",
            "current_location": "NH48 Highway Km 112 (JNPA Corridor)",
            "destination": "ICD Dadri (Delhi NCR)",
            "current_route": "Highway Route A (NH48)",
            "estimated_delivery": "Tomorrow 18:30",
            "status": "Delayed",
            "customer_name": "Tata Motors Logistics",
            "supplier_name": "CONCOR Logistics India",
            "product": "Industrial Electronics & Auto Components (45 TEU)",
            "quantity": 45
        },
        {
            "id": "SHP-105",
            "order_id": "ORD-7734",
            "current_location": "Hazira Port Terminal",
            "destination": "ICD Tughlakabad",
            "current_route": "Coastal Barge + Road Link",
            "estimated_delivery": "Tomorrow 08:00",
            "status": "In Transit",
            "customer_name": "Tata Motors Logistics",
            "supplier_name": "CONCOR Logistics India",
            "product": "Pharmaceutical Cold Chain Vaccines (30 TEU)",
            "quantity": 30
        }
    ])

@app.route('/shipments/<shipment_id>', methods=['GET'])
def get_shipment_by_id(shipment_id):
    return jsonify({
        "id": shipment_id,
        "order_id": "ORD-7721",
        "current_location": "NH48 Highway Km 112 (JNPA Corridor)",
        "destination": "ICD Dadri (Delhi NCR)",
        "current_route": "Highway Route A (NH48)",
        "estimated_delivery": "Tomorrow 18:30",
        "status": "Delayed",
        "customer_name": "Tata Motors Logistics",
        "supplier_name": "CONCOR Logistics India",
        "product": "Industrial Electronics & Auto Components (45 TEU)",
        "quantity": 45
    })

@app.route('/shipments/<shipment_id>', methods=['PATCH'])
def update_shipment_status(shipment_id):
    data = request.json or {}
    return jsonify({
        "id": shipment_id,
        "order_id": "ORD-7721",
        "current_location": data.get("current_location", "JNPA Port Gate 4"),
        "destination": "ICD Dadri (Delhi NCR)",
        "current_route": "WDFC Electric Rail",
        "estimated_delivery": "Optimized ETA",
        "status": data.get("status", "Rerouted")
    })

# ==========================================
# Reroute Requests & Approvals
# ==========================================

@app.route('/reroute-requests', methods=['GET'])
def get_reroute_requests():
    return jsonify([
        {
            "id": "REROUTE-9482",
            "shipment_id": "SHP-102",
            "reason": "Severe highway congestion and monsoon landslide blockage detected on NH48 Corridor.",
            "proposed_route": "WDFC Electric Freight Rail Route B (Rewari Link)",
            "status": "PENDING",
            "created_by": "SmartEVAC AI Senser Agent",
            "created_at": datetime.datetime.utcnow().isoformat(),
            "shipment_current_route": "Highway Route A (NH48)"
        }
    ])

@app.route('/reroute-requests', methods=['POST'])
def create_reroute_request():
    data = request.json or {}
    req_id = f"REROUTE-{random.randint(1000, 9999)}"
    return jsonify({
        "id": req_id,
        "shipment_id": data.get("shipment_id", "SHP-102"),
        "reason": data.get("reason", "Landside bottleneck reroute"),
        "proposed_route": data.get("proposed_route", "WDFC Freight Rail Corridor"),
        "status": "PENDING",
        "created_by": "SmartEVAC AI Senser Agent",
        "created_at": datetime.datetime.utcnow().isoformat(),
        "shipment_current_route": "NH48 Highway"
    }), 201

@app.route('/reroute-requests/<request_id>/approve', methods=['POST'])
def approve_reroute(request_id):
    return jsonify({
        "id": request_id,
        "shipment_id": "SHP-102",
        "status": "APPROVED",
        "proposed_route": "WDFC Electric Freight Rail Route B (Rewari Link)"
    })

@app.route('/reroute-requests/<request_id>/reject', methods=['POST'])
def reject_reroute(request_id):
    return jsonify({
        "id": request_id,
        "shipment_id": "SHP-102",
        "status": "REJECTED"
    })

# ==========================================
# Notifications & PDF Waybill Endpoints
# ==========================================

@app.route('/notifications', methods=['GET'])
def get_notifications():
    return jsonify([
        {
            "id": "NOTIF-01",
            "user_id": 1,
            "message": "AI Alert: High congestion detected on NH48. Shipment #SHP-102 reroute request generated.",
            "type": "ALERT",
            "is_read": False,
            "created_at": datetime.datetime.utcnow().isoformat()
        }
    ])

@app.route('/notifications/<notification_id>/read', methods=['POST'])
def mark_notification_read(notification_id):
    return jsonify({
        "id": notification_id,
        "user_id": 1,
        "message": "AI Alert: High congestion detected on NH48.",
        "type": "ALERT",
        "is_read": True,
        "created_at": datetime.datetime.utcnow().isoformat()
    })

@app.route('/api/pdf/concor/<container_id>', methods=['GET'])
def download_concor_pdf(container_id):
    pdf_bytes = generate_concor_rail_booking_pdf(
        container_id=container_id,
        route_info={"mode": "WDFC Electric Freight Rail", "base_transit_hours": 22},
        sap_fo_id="FO-80049281"
    )
    return Response(
        pdf_bytes,
        mimetype="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=CONCOR_Rail_Waybill_{container_id}.pdf"}
    )

@app.route('/api/pdf/customs/<container_id>', methods=['GET'])
def download_customs_pdf(container_id):
    pdf_bytes = generate_customs_prefiling_pdf(
        container_id=container_id,
        cargo_desc="Industrial Auto Components & Electronics TEU",
        destination="ICD Dadri (Delhi NCR Corridor)"
    )
    return Response(
        pdf_bytes,
        mimetype="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=ICEGATE_Customs_GatePass_{container_id}.pdf"}
    )

@app.route('/.well-known/agent-card.json', methods=['GET'])
def agent_card():
    return jsonify({
        "name": "SmartEVAC Control Tower Agent Network",
        "description": "Autonomous Multi-Agent Evacuation System interfacing Vision Sensing and Supplier Dispatch",
        "version": "2.4.0",
        "protocol": "A2A/1.0",
        "agents": {
            "vision_agent": {
                "id": "agent-vision-8081",
                "role": "Disruption & Visual Camera Sensing",
                "endpoint": "http://127.0.0.1:5000/agents/vision",
                "model": "Gemini 3 Flash"
            },
            "supplier_agent": {
                "id": "agent-supplier-8082",
                "role": "Carrier Dispatch & AlloyDB Querying",
                "endpoint": "http://127.0.0.1:5000/agents/supplier"
            }
        }
    })

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path.startswith('api/') or path.startswith('auth/') or path.startswith('orders') or path.startswith('shipments') or path.startswith('reroute-requests') or path.startswith('notifications') or path.startswith('multimodal-comparison'):
        return jsonify({"error": "Endpoint not found"}), 404
    static_folder = os.path.join(os.path.dirname(__file__), 'static')
    if os.path.exists(os.path.join(static_folder, path)) and path != '':
        return send_file(os.path.join(static_folder, path))
    index_file = os.path.join(static_folder, 'index.html')
    if os.path.exists(index_file):
        return send_file(index_file)
    return jsonify({"message": "SmartEVAC AI Backend Engine Operational", "status": "200 OK"}), 200

if __name__ == '__main__':
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() in ["true", "1"]
    port = int(os.getenv("PORT", 5000))
    print(f"SmartEvac AI Flask Backend running on http://0.0.0.0:{port} (Debug: {debug_mode})")
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
