import http.server
import socketserver
import json
import datetime
import os
import sys

# Add directory to sys.path to import local modules safely
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

PORT = 5000

class SmartEvacApiHandler(http.server.BaseHTTPRequestHandler):
    def _set_cors_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_cors_headers(204)

    def do_GET(self):
        if self.path == '/api/health':
            self._set_cors_headers(200)
            payload = {
                "status": "OPERATIONAL",
                "system": "SmartEvac AI SAP BTP Engine",
                "timestamp": datetime.datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(payload).encode('utf-8'))

        elif self.path == '/api/metrics':
            self._set_cors_headers(200)
            payload = {
                "containersInTransit": 1248,
                "activeShipments": 87,
                "currentDisruptions": 3,
                "averageDelayHours": 4.7,
                "costExposureLakhs": 18.4,
                "co2ExposureTons": 12.8
            }
            self.wfile.write(json.dumps(payload).encode('utf-8'))

        elif self.path == '/api/disruption':
            self._set_cors_headers(200)
            payload = {
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
            }
            self.wfile.write(json.dumps(payload).encode('utf-8'))

        else:
            self._set_cors_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_POST(self):
        if self.path == '/api/simulate':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8')) if post_data else {}
            except Exception:
                data = {}

            # Attempt importing agents module
            try:
                from agents import multi_agent_system
                container_data = data.get("container", {
                    "id": "MSCU-948201",
                    "type": "Standard 40ft TEU",
                    "destination": "ICD Dadri",
                    "dwell_days": 5
                })
                congestion_score = data.get("congestion_score", 82)
                result = multi_agent_system.run_evacuation_crew(container_data, congestion_score)
            except Exception as e:
                result = {
                    "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "status": "SIMULATED_FALLBACK",
                    "message": "120 TEU containers rerouted to WDFC Rail Corridor.",
                    "details": str(e)
                }

            self._set_cors_headers(200)
            self.wfile.write(json.dumps(result).encode('utf-8'))
        else:
            self._set_cors_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SmartEvacApiHandler) as httpd:
        print(f"SmartEvac AI Python Backend running on http://localhost:{PORT}")
        print("API Endpoints available: /api/health, /api/metrics, /api/disruption, /api/simulate")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
