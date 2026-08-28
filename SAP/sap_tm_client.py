import datetime
import random
import json
import config

class SAPTransportationManagementClient:
    """
    Mock API client for SAP BTP Transportation Management (SAP TM).
    Simulates enterprise integration calls to SAP S/4HANA TM and SAP BTP services.
    """
    def __init__(self):
        self.base_url = config.SAP_BTP_TM_URL
        self.client_id = config.SAP_CLIENT_ID
        self.audit_logs = []
        self._seed_initial_logs()

    def _seed_initial_logs(self):
        """Seed initial SAP BTP TM system logs."""
        timestamp = (datetime.datetime.now() - datetime.timedelta(minutes=15)).strftime("%Y-%m-%d %H:%M:%S")
        self.audit_logs.append({
            "timestamp": timestamp,
            "sap_service": "SAP BTP Integration Suite / TM-API",
            "endpoint": "/api/v1/TransportationNetwork/Terminals/JNPA",
            "method": "GET",
            "status_code": 200,
            "request": {"query": "JNPA_TERMINAL_HEALTHCHECK"},
            "response": {"terminal": "JNPA_CONTAINER_TERMINAL", "status": "ONLINE", "sap_system": "S4H_PRD_100"}
        })

    def log_transaction(self, endpoint, method, status_code, request_payload, response_payload):
        log_entry = {
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3],
            "sap_service": "SAP TM (Transportation Management)",
            "endpoint": endpoint,
            "method": method,
            "status_code": status_code,
            "request": request_payload,
            "response": response_payload
        }
        self.audit_logs.insert(0, log_entry)
        return log_entry

    def get_carrier_rates(self, origin, destination, mode):
        """
        Mock query to SAP TM Carrier Agreement & Rate Management module.
        """
        endpoint = "/api/v1/RateManagement/CarrierRatesQuery"
        req_payload = {"origin": origin, "destination": destination, "transport_mode": mode}
        
        # Calculate carrier options based on mode
        if "Rail" in mode:
            carrier = "CONCOR (Container Corporation of India) - SAP Partner ID: 100482"
            rate_per_teu = 420.0
            available_slots = 180
        elif "Road" in mode:
            carrier = "VRL Logistics / TCI Freight - SAP Partner ID: 100912"
            rate_per_teu = 680.0
            available_slots = 45
        else:
            carrier = "Shipping Corporation of India (SCI) - SAP Partner ID: 100234"
            rate_per_teu = 310.0
            available_slots = 300

        res_payload = {
            "query_status": "SUCCESS",
            "sap_tm_contract_id": f"CONT-2026-{random.randint(1000, 9999)}",
            "recommended_carrier": carrier,
            "agreed_rate_usd": rate_per_teu,
            "capacity_available_teu": available_slots,
            "valid_until": (datetime.datetime.now() + datetime.timedelta(days=7)).strftime("%Y-%m-%d")
        }

        self.log_transaction(endpoint, "POST", 200, req_payload, res_payload)
        return res_payload

    def create_freight_order(self, container_id, route_key, container_type="Standard 40ft TEU"):
        """
        Mock creation of SAP TM Freight Order (FO) document.
        """
        endpoint = "/api/v1/FreightOrders/Create"
        fo_number = f"FO-8004{random.randint(10000, 99999)}"
        route_info = config.ROUTES_DATA.get(route_key, config.ROUTES_DATA["WDFC_RAIL"])

        req_payload = {
            "sap_document_type": "TOR_FO (Transportation Order - Freight Order)",
            "container_id": container_id,
            "container_type": container_type,
            "origin_location": "LOC_JNPA_PORT_MUMBAI",
            "destination_location": "LOC_ICD_DADRI_NCR",
            "route_assigned": route_info["name"],
            "planned_transport_mode": route_info["mode"]
        }

        res_payload = {
            "sap_freight_order_id": fo_number,
            "status": "RELEASED_FOR_EXECUTION",
            "sap_btp_status": "201 Created",
            "sap_system_client": "SAP S/4HANA Cloud (TM 2026)",
            "execution_details": {
                "planned_departure": (datetime.datetime.now() + datetime.timedelta(hours=2)).strftime("%Y-%m-%d %H:%M HRS"),
                "estimated_arrival": (datetime.datetime.now() + datetime.timedelta(hours=route_info["base_transit_hours"])).strftime("%Y-%m-%d %H:%M HRS"),
                "carrier_tender_id": f"TND-{random.randint(50000, 99999)}",
                "customs_clearance_status": "PRE_FILED_GREEN_CHANNEL"
            }
        }

        self.log_transaction(endpoint, "POST", 201, req_payload, res_payload)
        return res_payload

    def update_container_status(self, container_id, new_status, location_name):
        """
        Mock event dispatch to SAP Event Management (EM) module.
        """
        endpoint = "/api/v1/EventManagement/EventReport"
        event_id = f"EVT-EM-{random.randint(100000, 999999)}"
        
        req_payload = {
            "event_id": event_id,
            "container_id": container_id,
            "event_code": new_status,
            "event_location": location_name,
            "reporting_timestamp": datetime.datetime.now().isoformat()
        }

        res_payload = {
            "sap_event_processed": True,
            "event_id": event_id,
            "sap_em_status": "CONFIRMED",
            "message": f"Container {container_id} status updated to {new_status} at {location_name} in SAP S/4HANA."
        }

        self.log_transaction(endpoint, "POST", 200, req_payload, res_payload)
        return res_payload

    def get_sap_audit_logs(self):
        """Return the transaction logs for display in Streamlit audit feed."""
        return self.audit_logs

# Global singleton instance
sap_client = SAPTransportationManagementClient()
