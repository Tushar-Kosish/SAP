import datetime
import random

class SAPTMClient:
    def __init__(self, endpoint="/SAP/TM/SO_DATA"):
        self.endpoint = endpoint
        self.simulation_mode = True

    def fetch_transport_orders(self):
        if self.simulation_mode:
            return [
                {"orderId": "TO-90412", "status": "In Execution", "carrier": "Global Logistics Corp", "units": 14},
                {"orderId": "TO-90413", "status": "Rerouting Suggested", "carrier": "Pacific Freight Line", "units": 8}
            ]
        return []

    def get_carrier_rates(self, origin, destination, mode):
        return {
            "query_status": "SUCCESS",
            "recommended_carrier": "CONCOR Logistics India",
            "agreed_rate_usd": 420.0
        }

sap_client = SAPTMClient()
