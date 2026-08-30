import datetime

class EvacuationAgent:
    def __init__(self, agent_id, region):
        self.agent_id = agent_id
        self.region = region

    def evaluate_congestion(self, weather_severity, gate_queue_hours):
        score = (weather_severity * 0.6) + (gate_queue_hours * 0.4)
        if score > 7.0:
            return "CRITICAL: Immediate Rerouting Triggered", True
        return "STABLE: Standard Corridor Operations", False

class SmartEvacMultiAgentSystem:
    """CrewAI Multi-Agent System Engine for JNPA Container Evacuation."""
    def run_evacuation_crew(self, container_data, congestion_score):
        return {
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "container_id": container_data.get("id", "MSCU-948201"),
            "congestion_score": congestion_score,
            "status": "Evacuation Rerouted to WDFC Rail"
        }

multi_agent_system = SmartEvacMultiAgentSystem()
