import datetime
import random
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from models import Shipment, RerouteRequest, Notification, User, Order

class AIReroutingEngine:
    """Modular AI Agent system for supply chain disruption detection and multi-modal route optimization."""

    def __init__(self):
        self.agent_name = "SmartEVAC Multi-Agent AI Engine v2.4"

    def calculate_multimodal_metrics(self, distance_km: int = 1200) -> Dict[str, Dict[str, Any]]:
        """Calculates realistic transit times, costs, and carbon emissions across 4 transport modes."""
        return {
            "road": {
                "name": "Highway Heavy Trucking (NH48)",
                "mode": "Road",
                "transit_time_hours": round(distance_km / 30, 1),  # ~40 hrs
                "cost_per_teu_inr": 18500,
                "co2_tons_per_teu": 2.4,
                "risk_level": "High (Highway Congestion & Monsoon Blockages)",
                "ai_score": 58
            },
            "rail": {
                "name": "WDFC High-Speed Electric Freight Rail",
                "mode": "Rail",
                "transit_time_hours": round(distance_km / 55, 1),  # ~21.8 hrs
                "cost_per_teu_inr": 12500,
                "co2_tons_per_teu": 0.6,
                "risk_level": "Low (Dedicated Electric Rail Corridor)",
                "ai_score": 94,
                "recommended": True
            },
            "coastal": {
                "name": "West Coast Feeder Barge Shipping",
                "mode": "Sea / Coastal",
                "transit_time_hours": round(distance_km / 35 + 8, 1),  # ~42.3 hrs
                "cost_per_teu_inr": 9800,
                "co2_tons_per_teu": 0.8,
                "risk_level": "Medium (Sea Port Dwell Times)",
                "ai_score": 82
            },
            "air": {
                "name": "Priority Express Air Freight Charter",
                "mode": "Air Cargo",
                "transit_time_hours": round(distance_km / 400 + 4, 1),  # ~7.0 hrs
                "cost_per_teu_inr": 48000,
                "co2_tons_per_teu": 7.5,
                "risk_level": "Low (Emergency Air Corridor)",
                "ai_score": 75
            }
        }

    def analyze_disruption_and_recommend(
        self,
        shipment_id: str,
        disruption_reason: str,
        db: Session,
        custom_prompt: str = ""
    ) -> RerouteRequest:
        """
        Processes custom disruption prompt from Admin / Sensing Agent,
        computes multi-modal transit metrics, and creates RerouteRequest.
        """
        shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
        if not shipment:
            raise ValueError(f"Shipment {shipment_id} not found")

        full_reason = disruption_reason
        if custom_prompt:
            full_reason = f"{disruption_reason} | AI Custom Prompt Analysis: '{custom_prompt}'"

        # Determine optimal proposed route based on disruption keyword analysis
        prompt_lower = (disruption_reason + " " + custom_prompt).lower()
        if "air" in prompt_lower or "urgent" in prompt_lower or "critical" in prompt_lower:
            proposed_route = "Express Air Freight Charter (7.0h Transit | Critical Delivery)"
        elif "sea" in prompt_lower or "barge" in prompt_lower or "port" in prompt_lower:
            proposed_route = "West Coast Feeder Barge Link (36.0h Transit | ESG Eco Route)"
        else:
            proposed_route = "WDFC Electric Freight Rail Corridor B (22.0h Transit | Saved 20h Delay)"

        reroute_id = f"REROUTE-{random.randint(1000, 9999)}"
        reroute_request = RerouteRequest(
            id=reroute_id,
            shipment_id=shipment.id,
            reason=full_reason,
            proposed_route=proposed_route,
            status="PENDING",
            created_by=self.agent_name,
            created_at=datetime.datetime.utcnow()
        )
        db.add(reroute_request)
        db.commit()
        db.refresh(reroute_request)

        # Notify all admins about the new AI reroute request
        admins = db.query(User).filter(User.role == "admin").all()
        for admin in admins:
            notif = Notification(
                id=f"NOTIF-{random.randint(10000, 99999)}",
                user_id=admin.id,
                message=f"AI Disruption Analysis Complete: Reroute Request {reroute_id} generated for Shipment #{shipment.id}. Recommended: {proposed_route}.",
                type="ALERT",
                is_read=False
            )
            db.add(notif)
        db.commit()

        return reroute_request

ai_engine = AIReroutingEngine()
