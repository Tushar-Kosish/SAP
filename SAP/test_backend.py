import unittest
import json
import io
from app import app
from database import init_db

class SmartEvacBackendQATestCase(unittest.TestCase):
    """
    Comprehensive QA & Integration Test Suite for SmartEVAC AI Backend Engine.
    """

    def setUp(self):
        self.app = app
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
        init_db()

    # ----------------------------------------------------------------------
    # 1. Core Health & System Telemetry Tests
    # ----------------------------------------------------------------------

    def test_01_health_check(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('status'), 'OPERATIONAL')
        self.assertIn('system', data)

    def test_02_metrics_telemetry(self):
        response = self.client.get('/api/metrics')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('containersInTransit', data)
        self.assertGreater(data.get('containersInTransit'), 0)
        self.assertIn('activeShipments', data)

    def test_03_disruption_event(self):
        response = self.client.get('/api/disruption')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('severity'), 'CRITICAL')
        self.assertIn('JNPA', data.get('corridor'))

    # ----------------------------------------------------------------------
    # 2. Authentication & Authorization Tests
    # ----------------------------------------------------------------------

    def test_04_user_api_login(self):
        payload = {"username": "admin@smartevac.ai", "password": "admin123"}
        response = self.client.post('/api/auth/login', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('token', data)
        self.assertEqual(data.get('role'), 'Admin')

    def test_05_auth_login_jwt(self):
        payload = {"email": "supplier@concor.co.in", "password": "supplier123"}
        response = self.client.post('/auth/login', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertEqual(data.get('role'), 'supplier')

    def test_06_auth_register(self):
        payload = {"email": "newcustomer@test.com", "name": "Test Customer", "role": "customer"}
        response = self.client.post('/auth/register', json=payload)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        self.assertEqual(data.get('email'), 'newcustomer@test.com')

    def test_07_auth_me(self):
        login_res = self.client.post('/auth/login', json={"email": "admin@smartevac.ai"})
        token = json.loads(login_res.data).get('access_token')
        
        response = self.client.get('/auth/me', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('role'), 'admin')

    # ----------------------------------------------------------------------
    # 3. SAP TM & AI Agent Evaluation Tests
    # ----------------------------------------------------------------------

    def test_08_sap_transport_orders(self):
        response = self.client.get('/api/sap/orders')
        self.assertEqual(response.status_code, 200)
        orders = json.loads(response.data)
        self.assertIsInstance(orders, list)
        self.assertGreater(len(orders), 0)
        self.assertIn('orderId', orders[0])

    def test_09_evacuation_agent_status(self):
        response = self.client.get('/api/agents/status')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('agentId'), 'Agent-Alpha')
        self.assertIn('decision', data)

    def test_10_multimodal_comparison(self):
        response = self.client.get('/multimodal-comparison?distance_km=1200')
        self.assertEqual(response.status_code, 200)
        modes = json.loads(response.data)
        self.assertIn('rail', modes)
        self.assertIn('road', modes)
        self.assertTrue(modes['rail'].get('recommended'))

    def test_11_simulation(self):
        payload = {"container": {"id": "MSCU-889900", "type": "40ft Reefer"}, "congestion_score": 85}
        response = self.client.post('/api/simulate', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('container_id'), 'MSCU-889900')

    # ----------------------------------------------------------------------
    # 4. Orders, Shipments & Rerouting Workflow Tests
    # ----------------------------------------------------------------------

    def test_12_get_orders(self):
        response = self.client.get('/orders')
        self.assertEqual(response.status_code, 200)
        orders = json.loads(response.data)
        self.assertIsInstance(orders, list)

    def test_13_create_order(self):
        payload = {"product": "Auto Spare Parts", "quantity": 25}
        response = self.client.post('/orders', json=payload)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('ORD-', data.get('id'))

    def test_14_get_shipments(self):
        response = self.client.get('/shipments')
        self.assertEqual(response.status_code, 200)
        shipments = json.loads(response.data)
        self.assertIsInstance(shipments, list)

    def test_15_get_shipment_by_id(self):
        response = self.client.get('/shipments/SHP-102')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('id'), 'SHP-102')

    def test_16_update_shipment_status(self):
        payload = {"status": "Rerouted via WDFC Rail", "current_location": "JNPA Rail Yard"}
        response = self.client.patch('/shipments/SHP-102', json=payload)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('status'), 'Rerouted via WDFC Rail')

    def test_17_reroute_requests(self):
        response = self.client.get('/reroute-requests')
        self.assertEqual(response.status_code, 200)
        requests_list = json.loads(response.data)
        self.assertIsInstance(requests_list, list)

    def test_18_approve_reroute(self):
        response = self.client.post('/reroute-requests/REROUTE-9482/approve')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('status'), 'APPROVED')

    # ----------------------------------------------------------------------
    # 5. PDF Waybill Generation & Document Tests
    # ----------------------------------------------------------------------

    def test_19_concor_pdf_download(self):
        response = self.client.get('/api/pdf/concor/MSCU-948201')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'application/pdf')
        self.assertTrue(response.data.startswith(b'%PDF'))

    def test_20_customs_pdf_download(self):
        response = self.client.get('/api/pdf/customs/MSCU-948201')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'application/pdf')
        self.assertTrue(response.data.startswith(b'%PDF'))

    def test_21_agent_card_manifest(self):
        response = self.client.get('/.well-known/agent-card.json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data.get('protocol'), 'A2A/1.0')

if __name__ == '__main__':
    unittest.main()
