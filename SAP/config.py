import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# LLM Configuration
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "openai").lower()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME", "gpt-4o")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# SAP BTP TM Mock Integration
SAP_BTP_TM_URL = os.getenv("SAP_BTP_TM_URL", "https://sandbox.api.sap.com/saptm/v1")
SAP_CLIENT_ID = os.getenv("SAP_BTP_CLIENT_ID", "SAP_BTP_DEMO_CLIENT")

# Evacuation Logistics Constants
PORT_NAME = "JNPA (Jawaharlal Nehru Port Authority)"
DEFAULT_CONGESTION_THRESHOLD = 75.0  # % Yard Occupancy triggering alert
TARGET_CONTAINER_TYPES = ["Standard 40ft TEU", "Reefer (Cold Chain)", "Hazmat Chemical", "High Priority Automotive"]

# Coordinates for Geospatial Folium Mapping
COORDINATES = {
    "JNPA_PORT": [18.9500, 72.9500],
    "ICD_DADRI": [28.5500, 77.5500],
    "DELHI_NCR": [28.6139, 77.2090],
    "PORT_PIPAVAV": [20.9142, 71.5034],
    "SURAT": [21.1702, 72.8311],
    "VADODARA": [22.3072, 73.1812],
    "AHMEDABAD": [23.0225, 72.5714],
    "JAIPUR": [26.9124, 75.7873],
    "REWARI": [28.1800, 76.6200],
    "NASHIK": [19.9975, 73.7898],
    "INDORE": [22.7196, 75.8577],
    "BOM_AIRPORT": [19.0896, 72.8656],
    "DEL_AIRPORT": [28.5562, 77.1000],
}

# 5 Multimodal Evacuation Routes
ROUTES_DATA = {
    "WDFC_RAIL": {
        "name": "1. WDFC Rail Corridor (₹51,000 Cr Dedicated Freight Corridor)",
        "color": "#10B981",  # Emerald Green
        "mode": "WDFC Electrified Freight Rail",
        "waypoints": [
            COORDINATES["JNPA_PORT"],
            [19.4674, 72.8080], # Vaitarna
            [20.3700, 72.9000], # Sanjan
            COORDINATES["VADODARA"],
            COORDINATES["REWARI"],
            COORDINATES["ICD_DADRI"]
        ],
        "base_cost_per_teu": 420.0,    # USD per TEU
        "base_co2_kg_per_teu": 85.0,   # Lowest emissions (Electric Rail)
        "base_transit_hours": 24,       # Fast 100 trains/day capacity
        "reliability_score": 96,        # Highest reliability
        "description": "Unlocks India's ₹51,000 Cr WDFC rail corridor. High capacity, zero highway congestion."
    },
    "NH48_ROAD": {
        "name": "2. Primary NH48 Highway Heavy Trucking",
        "color": "#EF4444",  # Crimson Red
        "mode": "Primary Diesel Road Trucking",
        "waypoints": [
            COORDINATES["JNPA_PORT"],
            COORDINATES["SURAT"],
            COORDINATES["VADODARA"],
            COORDINATES["AHMEDABAD"],
            COORDINATES["JAIPUR"],
            COORDINATES["DELHI_NCR"]
        ],
        "base_cost_per_teu": 680.0,    # USD per TEU
        "base_co2_kg_per_teu": 310.0,  # High emissions
        "base_transit_hours": 44,       # Vulnerable to toll/gate queues
        "reliability_score": 72,        # Moderate
        "description": "Standard heavy trucking route via NH48. Subject to JNPA 20-hr gate queues."
    },
    "ALT_ROAD_NH52": {
        "name": "3. Alternate Highway Route (via NH52 / Nashik-Indore Bypass)",
        "color": "#F59E0B",  # Amber / Orange
        "mode": "Alternate Road Trucking",
        "waypoints": [
            COORDINATES["JNPA_PORT"],
            COORDINATES["NASHIK"],
            COORDINATES["INDORE"],
            COORDINATES["JAIPUR"],
            COORDINATES["DELHI_NCR"]
        ],
        "base_cost_per_teu": 740.0,    # Slightly higher fuel cost
        "base_co2_kg_per_teu": 330.0,  # High emissions
        "base_transit_hours": 38,       # Bypasses NH48 coastal traffic
        "reliability_score": 81,        # Good bypass reliability
        "description": "Bypasses NH48 coastal bottlenecks via Nashik-Indore highway corridor."
    },
    "COASTAL_SHIPPING": {
        "name": "4. Coastal Feeder Shipping (JNPA -> Port of Pipavav)",
        "color": "#3B82F6",  # Royal Blue
        "mode": "Maritime Feeder + Inland Rail",
        "waypoints": [
            COORDINATES["JNPA_PORT"],
            [19.8000, 72.2000],
            [20.4000, 71.8000],
            COORDINATES["PORT_PIPAVAV"],
            [23.0000, 72.0000],
            COORDINATES["ICD_DADRI"]
        ],
        "base_cost_per_teu": 310.0,    # Lowest cost
        "base_co2_kg_per_teu": 120.0,  # Low-Medium emissions
        "base_transit_hours": 58,       # High capacity slow transit
        "reliability_score": 89,        # High marine reliability
        "description": "Shifts yard overflow to Gujarat coastal ports. Lowest cost per TEU."
    },
    "AIR_CARGO": {
        "name": "5. Express Air Cargo Evacuation (BOM -> DEL Air Hub)",
        "color": "#8B5CF6",  # Purple / Magenta
        "mode": "Express Air Freight",
        "waypoints": [
            COORDINATES["JNPA_PORT"],
            COORDINATES["BOM_AIRPORT"],
            COORDINATES["DEL_AIRPORT"],
            COORDINATES["DELHI_NCR"]
        ],
        "base_cost_per_teu": 2400.0,   # Premium express air cost
        "base_co2_kg_per_teu": 920.0,  # High emissions
        "base_transit_hours": 8,        # Ultra-fast emergency evacuation
        "reliability_score": 98,        # Highest speed guarantee
        "description": "Emergency air freight for critical pharmaceuticals, hazmat, or perishable reefer cargo."
    }
}
