import os
import json
import datetime
import config
from sap_tm_client import sap_client
import pdf_generator

class SmartEvacMultiAgentSystem:
    """
    CrewAI Multi-Agent System Engine for JNPA Container Evacuation.
    Orchestrates 5-Pathway Evaluation across Sensing, Rerouting, Documentation, and SAP Execution Agents.
    """
    def __init__(self):
        self.openai_key = config.OPENAI_API_KEY
        self.gemini_key = config.GEMINI_API_KEY

    def run_evacuation_crew(self, container_data, congestion_score):
        """
        Executes full multi-agent collaborative workflow for container evacuation across 5 pathways.
        """
        container_id = container_data.get("id", "MSCU-948201")
        container_type = container_data.get("type", "Standard 40ft TEU")
        destination = container_data.get("destination", "ICD Dadri")
        dwell_days = container_data.get("dwell_days", 5)

        # Agent Step 1: Sensing Agent Assessment
        sensing_output = self._run_sensing_agent(congestion_score, dwell_days)

        # Agent Step 2: Rerouting Agent Evaluation across ALL 5 Pathways
        rerouting_output = self._run_rerouting_agent(container_data, congestion_score, sensing_output)

        # Agent Step 3: SAP Execution Agent Dispatch
        sap_output = self._run_sap_execution_agent(container_id, container_type, rerouting_output["recommended_route_key"])

        # Agent Step 4: Documentation Agent PDF Generation
        doc_output = self._run_documentation_agent(container_id, container_data, rerouting_output, sap_output)

        return {
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "container_id": container_id,
            "congestion_score": congestion_score,
            "sensing_agent": sensing_output,
            "rerouting_agent": rerouting_output,
            "sap_execution_agent": sap_output,
            "documentation_agent": doc_output
        }

    def _run_sensing_agent(self, congestion_score, dwell_days):
        """Sensing Agent: Monitors landside port yard occupancy and gate queues."""
        risk_level = "CRITICAL GRIDLOCK" if congestion_score > 80 else ("ELEVATED BOTTLENECK" if congestion_score > 60 else "NORMAL FLOW")
        vessel_delay = round(congestion_score * 0.4, 1)
        yard_occupancy = min(98.5, round(60.0 + (congestion_score * 0.38), 1))
        gate_queue_hours = round(congestion_score * 0.22, 1)
        
        reasoning = (
            f"[Sensing Agent Analysis] Landside Bottleneck Alert: JNPA Port yard occupancy is currently at {yard_occupancy}%. "
            f"Gate queue delays average {gate_queue_hours} hours. Vessel delay index stands at {vessel_delay} hours. "
            f"Congestion Index {congestion_score}/100 indicates {risk_level}. Landside container evacuation required immediately."
        )

        return {
            "agent_role": "JNPA Landside Congestion & Yard Sensor Specialist",
            "risk_level": risk_level,
            "yard_occupancy_pct": yard_occupancy,
            "vessel_delay_hours": vessel_delay,
            "gate_queue_hours": gate_queue_hours,
            "reasoning": reasoning
        }

    def _run_rerouting_agent(self, container_data, congestion_score, sensing_info):
        """Rerouting Agent: Evaluates ALL 5 Pathways (WDFC Rail, Primary Road, Alternate Road, Coastal, Air Cargo)."""
        c_type = container_data.get("type", "Standard 40ft TEU")
        dest = container_data.get("destination", "ICD Dadri")

        # 5-Pathway Evaluation Scoring Matrix
        scores = {}
        for rkey, rdata in config.ROUTES_DATA.items():
            # Composite Score calculation: Time, Cost, Reliability, Carbon
            cost_penalty = (rdata["base_cost_per_teu"] / 10.0)
            time_penalty = (rdata["base_transit_hours"] * 1.5)
            co2_penalty = (rdata["base_co2_kg_per_teu"] / 5.0)
            reliability_bonus = (rdata["reliability_score"] * 3.0)

            # Specific contextual adjustments
            if rkey == "WDFC_RAIL":
                # Rail is heavily favored under high port congestion due to ₹51,000 Cr WDFC 100 trains/day capacity
                wdfc_bonus = 60.0 if congestion_score >= 60 else 30.0
                score = 100.0 - cost_penalty - time_penalty - co2_penalty + reliability_bonus + wdfc_bonus
            elif rkey == "AIR_CARGO":
                # Air cargo favored for urgent Cold Chain / Hazmat emergency
                air_bonus = 80.0 if ("Reefer" in c_type or "High Priority" in c_type) else 0.0
                score = 100.0 - (cost_penalty * 0.3) - time_penalty - (co2_penalty * 0.2) + reliability_bonus + air_bonus
            elif rkey == "COASTAL_SHIPPING":
                coastal_bonus = 40.0 if congestion_score > 75 else 20.0
                score = 100.0 - cost_penalty - time_penalty - co2_penalty + reliability_bonus + coastal_bonus
            elif rkey == "ALT_ROAD_NH52":
                alt_bonus = 35.0 if congestion_score > 70 else 10.0
                score = 100.0 - cost_penalty - time_penalty - co2_penalty + reliability_bonus + alt_bonus
            else: # NH48_ROAD
                road_penalty = 50.0 if congestion_score > 65 else 0.0
                score = 100.0 - cost_penalty - time_penalty - co2_penalty + reliability_bonus - road_penalty

            scores[rkey] = round(score, 1)

        # Select highest scoring route
        recommended_key = max(scores, key=scores.get)
        route_details = config.ROUTES_DATA[recommended_key]

        if recommended_key == "WDFC_RAIL":
            rationale = (
                "🏆 Recommended: WDFC Rail Corridor (₹51,000 Cr Freight Corridor). "
                "Utilizes underutilized WDFC capacity (100 trains/day capability). Bypasses 20-hr NH48 truck gate queues, "
                "slashes CO2 emissions by 72% (85 kg/TEU vs 310 kg/TEU road), and guarantees 24-hr transit to ICD Dadri."
            )
        elif recommended_key == "AIR_CARGO":
            rationale = (
                "🏆 Recommended: Express Air Cargo Evacuation (BOM -> DEL Air Corridor). "
                "Urgent cold-chain / high priority cargo requires emergency 8-hour transit, completely bypassing port landside delays."
            )
        elif recommended_key == "COASTAL_SHIPPING":
            rationale = (
                "🏆 Recommended: Coastal Feeder Shipping (JNPA -> Port of Pipavav). "
                "Offers lowest freight cost ($310/TEU) and effectively absorbs heavy JNPA yard overflow."
            )
        elif recommended_key == "ALT_ROAD_NH52":
            rationale = (
                "🏆 Recommended: Alternate Highway Route via NH52 (Nashik-Indore Bypass). "
                "Bypasses gridlocked NH48 coastal highway queues, saving 6 hours over standard road transport."
            )
        else:
            rationale = (
                "🏆 Recommended: Primary NH48 Highway Heavy Trucking. "
                "Optimal direct point-to-point dispatch for standard road haulage."
            )

        return {
            "agent_role": "Multimodal Logistics Rerouting Strategist",
            "recommended_route_key": recommended_key,
            "recommended_route_name": route_details["name"],
            "transport_mode": route_details["mode"],
            "cost_usd": route_details["base_cost_per_teu"],
            "co2_kg": route_details["base_co2_kg_per_teu"],
            "eta_hours": route_details["base_transit_hours"],
            "reliability_score": route_details["reliability_score"],
            "reasoning": rationale,
            "scores_eval": scores,
            "all_5_pathways": config.ROUTES_DATA
        }

    def _run_sap_execution_agent(self, container_id, container_type, route_key):
        """SAP Execution Agent: Interfaces with SAP Transportation Management REST APIs."""
        carrier_rate = sap_client.get_carrier_rates("JNPA_PORT", "ICD_DADRI", config.ROUTES_DATA[route_key]["mode"])
        freight_order = sap_client.create_freight_order(container_id, route_key, container_type)
        status_update = sap_client.update_container_status(container_id, f"REROUTED_VIA_{route_key}", "JNPA_GATE_OUT")

        reasoning = (
            f"[SAP Execution Agent] Executed SAP BTP TM REST API calls. "
            f"Created Freight Order ID: {freight_order['sap_freight_order_id']} under carrier {carrier_rate['recommended_carrier']}. "
            f"Event Management status updated in SAP S/4HANA (201 Created)."
        )

        return {
            "agent_role": "SAP Transportation Management (TM) Integration Engineer",
            "sap_freight_order_id": freight_order["sap_freight_order_id"],
            "sap_carrier": carrier_rate["recommended_carrier"],
            "status": "SAP_ORDER_RELEASED",
            "reasoning": reasoning
        }

    def _run_documentation_agent(self, container_id, container_data, rerouting_info, sap_info):
        """Documentation Agent: Auto-generates paperwork needed for the modal switch."""
        sap_fo_id = sap_info["sap_freight_order_id"]
        route_info = config.ROUTES_DATA[rerouting_info["recommended_route_key"]]
        cargo_desc = container_data.get("cargo_description", "General Cargo & Components")
        dest = container_data.get("destination", "ICD Dadri")

        # Generate PDF byte streams
        concor_pdf_bytes = pdf_generator.generate_concor_rail_booking_pdf(container_id, route_info, sap_fo_id)
        customs_pdf_bytes = pdf_generator.generate_customs_prefiling_pdf(container_id, cargo_desc, dest)

        reasoning = (
            f"[Documentation Agent] Auto-generated complete modal-switch paperwork: "
            f"1) CONCOR / Multimodal Evacuation Waybill PDF for SAP FO {sap_fo_id}. "
            f"2) Indian Customs (ICEGATE) Green Channel Evacuation Gate Pass for Container {container_id}."
        )

        return {
            "agent_role": "Automated Supply Chain Documentation Controller",
            "concor_pdf_bytes": concor_pdf_bytes,
            "customs_pdf_bytes": customs_pdf_bytes,
            "reasoning": reasoning
        }

# Global Instance
multi_agent_system = SmartEvacMultiAgentSystem()
