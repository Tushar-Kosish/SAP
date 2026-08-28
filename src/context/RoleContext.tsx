import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { apiService } from '../services/api';
import { realtimeSync, SyncEvent } from '../services/realtimeSync';
import { generateReroutePDF } from '../services/pdfGenerator';

export type UserRole = 'client' | 'supplier' | 'admin' | 'customer';

export interface ClientShipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  containersCount: number;
  status: 'In Transit' | 'Delayed' | 'Rerouted' | 'Delivered' | 'Scheduled';
  cargoType: string;
  eta: string;
  originalEta: string;
  currentMode: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  rerouteApproved: boolean;
  costSavingsLakhs: number;
  co2SavingsTons: number;
  assignedSupplier: string;
}

export interface SupplierFleet {
  id: string;
  name: string;
  type: 'Rail Rake' | 'Truck Fleet' | 'Coastal Vessel' | 'Air Cargo Charter';
  capacityContainers: number;
  utilizedContainers: number;
  location: string;
  status: 'Available' | 'Assigned' | 'Maintenance';
  slaScorePercent: number;
  activeOrders: number;
}

export interface RerouteOrder {
  id: string;
  shipmentId: string;
  containers: number;
  fromMode: string;
  toMode: string;
  supplierName: string;
  requestedAt: string;
  status: 'PENDING_ACK' | 'ACCEPTED' | 'IN_TRANSIT' | 'COMPLETED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVERTED' | 'PENDING_ADMIN_APPROVAL';
  ratePerContainer: number;
  reason?: string;
  weatherReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  documentDataUri?: string;
  documentFilename?: string;
}

export interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clientShipments: ClientShipment[];
  supplierFleets: SupplierFleet[];
  rerouteOrders: RerouteOrder[];
  backendRerouteRequests: any[];
  transparencyEnabled: boolean;
  setTransparencyEnabled: (enabled: boolean) => void;
  toggleRerouteApproval: (shipmentId: string) => Promise<void>;
  approveRerouteRequest: (requestId: string) => Promise<void>;
  approveRerouteWithDocument: (requestId: string, adminNotes?: string) => Promise<void>;
  revokeRerouteOrder: (requestId: string) => Promise<void>;
  submitRerouteRequest: (req: {
    shipmentId: string;
    fromMode: string;
    toMode: string;
    containers: number;
    weatherReason: string;
    ratePerContainer?: number;
  }) => Promise<void>;
  rejectRerouteRequest: (requestId: string) => Promise<void>;
  updateFleetStatus: (fleetId: string, status: SupplierFleet['status'], utilized: number) => void;
  acceptRerouteOrder: (orderId: string) => void;
  triggerEmergencyOverride: (corridor: string) => Promise<void>;
  refreshData: () => Promise<void>;
  auditTrailCount: number;
  lastLiveEvent: SyncEvent | null;
}

const initialShipments: ClientShipment[] = [
  {
    id: 'SHP-102',
    trackingNumber: 'CONCOR-ICD-DADRI-JNPT-01',
    origin: 'JNPT Port Freight Terminal',
    destination: 'ICD Dadri (Delhi NCR)',
    containersCount: 45,
    status: 'Delayed',
    cargoType: 'Industrial Electronics & Auto Components',
    eta: 'Tomorrow 18:30',
    originalEta: 'Yesterday 22:00 (+20h delay avoided)',
    currentMode: 'Highway Route A (NH48)',
    riskLevel: 'High',
    rerouteApproved: false,
    costSavingsLakhs: 4.8,
    co2SavingsTons: 14.2,
    assignedSupplier: 'CONCOR Logistics India',
  },
  {
    id: 'SHP-105',
    trackingNumber: 'EXIM-MUM-DEL-89',
    origin: 'Hazira Port Terminal',
    destination: 'ICD Tughlakabad',
    containersCount: 30,
    status: 'In Transit',
    cargoType: 'Pharmaceutical Cold Chain Vaccines',
    eta: 'Tomorrow 08:00',
    originalEta: 'Tomorrow 09:30',
    currentMode: 'Coastal Barge + Road Link',
    riskLevel: 'Medium',
    rerouteApproved: true,
    costSavingsLakhs: 2.1,
    co2SavingsTons: 6.5,
    assignedSupplier: 'CONCOR Logistics India',
  },
];

const initialFleets: SupplierFleet[] = [
  {
    id: 'FLT-RAIL-01',
    name: 'DFCCIL High-Speed Rake #14',
    type: 'Rail Rake',
    capacityContainers: 90,
    utilizedContainers: 75,
    location: 'WDFC Rewari Junction',
    status: 'Assigned',
    slaScorePercent: 98.4,
    activeOrders: 3,
  },
  {
    id: 'FLT-TRK-09',
    name: 'VRL Heavy Haul Fleet B',
    type: 'Truck Fleet',
    capacityContainers: 40,
    utilizedContainers: 18,
    location: 'Gurugram Freight Hub',
    status: 'Available',
    slaScorePercent: 94.2,
    activeOrders: 1,
  },
  {
    id: 'FLT-BARGE-03',
    name: 'West Coast Coastal Express barge',
    type: 'Coastal Vessel',
    capacityContainers: 120,
    utilizedContainers: 95,
    location: 'Hazira Port Terminal',
    status: 'Assigned',
    slaScorePercent: 99.1,
    activeOrders: 2,
  },
  {
    id: 'FLT-AIR-07',
    name: 'Delhi-Mumbai Cargo Air Charter',
    type: 'Air Cargo Charter',
    capacityContainers: 15,
    utilizedContainers: 8,
    location: 'IGI Airport Cargo Terminal',
    status: 'Available',
    slaScorePercent: 99.8,
    activeOrders: 1,
  },
];

const initialOrders: RerouteOrder[] = [
  {
    id: 'REQ-8801',
    shipmentId: 'SHP-102',
    containers: 45,
    fromMode: 'Highway Route A (NH48 Heavy Rain & Flooding)',
    toMode: 'DFCCIL High-Speed Rail Corridor',
    supplierName: 'CONCOR Logistics India',
    requestedAt: '14:20 PM',
    status: 'PENDING_ADMIN_APPROVAL',
    ratePerContainer: 14200,
    reason: 'Heavy Downpour causing 14h congestion on Highway NH48.',
    weatherReason: 'Torrential rains causing flash floods on Gujarat-Maharashtra border.'
  }
];

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [role, setRoleState] = useState<UserRole>('admin');
  const [clientShipments, setClientShipments] = useState<ClientShipment[]>(initialShipments);
  const [supplierFleets, setSupplierFleets] = useState<SupplierFleet[]>(initialFleets);
  const [rerouteOrders, setRerouteOrders] = useState<RerouteOrder[]>(initialOrders);
  const [backendRerouteRequests, setBackendRerouteRequests] = useState<any[]>([]);
  const [transparencyEnabled, setTransparencyEnabled] = useState<boolean>(true);
  const [auditTrailCount, setAuditTrailCount] = useState<number>(142);
  const [lastLiveEvent, setLastLiveEvent] = useState<SyncEvent | null>(null);

  // Sync role with logged-in user
  useEffect(() => {
    if (user) {
      setRoleState(user.role);
    }
  }, [user]);

  // Subscribe to multi-device real-time sync events
  useEffect(() => {
    const unsubscribe = realtimeSync.subscribe((evt) => {
      setLastLiveEvent(evt);
      setAuditTrailCount((c) => c + 1);

      if (evt.type === 'REROUTE_APPROVED' || evt.type === 'REROUTE_TRIGGERED') {
        setClientShipments((prev) =>
          prev.map((s) => ({
            ...s,
            status: 'Rerouted',
            rerouteApproved: true,
            costSavingsLakhs: 4.8,
            co2SavingsTons: 14.2,
          }))
        );
      } else if (evt.type === 'SHIPMENT_STATUS_UPDATED') {
        if (evt.payload?.fleetId) {
          setSupplierFleets((prev) =>
            prev.map((f) =>
              f.id === evt.payload.fleetId
                ? { ...f, status: evt.payload.status, utilizedContainers: evt.payload.utilized || f.utilizedContainers }
                : f
            )
          );
        }
      }

      refreshData();
    });

    return () => unsubscribe();
  }, []);

  const refreshData = async () => {
    try {
      if (isAuthenticated) {
        // Fetch shipments from real backend if online
        const shipmentsData = await apiService.getShipments();
        if (shipmentsData && shipmentsData.length > 0) {
          const mapped: ClientShipment[] = shipmentsData.map((s) => ({
            id: s.id,
            trackingNumber: `CONCOR-${s.id}`,
            origin: s.current_location || 'JNPT Port',
            destination: s.destination || 'ICD Dadri',
            containersCount: s.quantity || 45,
            status: (s.status as any) || 'In Transit',
            cargoType: s.product || 'General Freight Cargo',
            eta: s.estimated_delivery || 'Within 24 Hours',
            originalEta: 'Yesterday 22:00',
            currentMode: s.current_route || 'Highway NH48',
            riskLevel: s.status === 'Delayed' ? 'High' : s.status === 'Rerouted' ? 'Low' : 'Medium',
            rerouteApproved: s.status === 'Rerouted',
            costSavingsLakhs: s.status === 'Rerouted' ? 4.8 : 0,
            co2SavingsTons: s.status === 'Rerouted' ? 14.2 : 0,
            assignedSupplier: s.supplier_name || 'CONCOR Logistics India',
          }));
          setClientShipments(mapped);
        }

        try {
          const rerouteData = await apiService.getRerouteRequests();
          if (rerouteData && rerouteData.length > 0) {
            setBackendRerouteRequests(rerouteData);
            const mappedOrders: RerouteOrder[] = rerouteData.map((r) => ({
              id: r.id,
              shipmentId: r.shipment_id,
              containers: 45,
              fromMode: r.shipment_current_route || 'Highway NH48',
              toMode: r.proposed_route,
              supplierName: 'CONCOR Logistics India',
              requestedAt: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: r.status === 'APPROVED' ? 'ACCEPTED' : (r.status as any),
              ratePerContainer: 14200,
              reason: r.reason
            }));
            setRerouteOrders(mappedOrders);
          }
        } catch (e) {}
      }
    } catch (err) {
      console.log("Error loading backend data:", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, [isAuthenticated, user]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const submitRerouteRequest = async (req: {
    shipmentId: string;
    fromMode: string;
    toMode: string;
    containers: number;
    weatherReason: string;
    ratePerContainer?: number;
  }) => {
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: RerouteOrder = {
      id: newId,
      shipmentId: req.shipmentId,
      containers: req.containers,
      fromMode: req.fromMode,
      toMode: req.toMode,
      supplierName: user?.name || 'CONCOR Logistics India',
      requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PENDING_ADMIN_APPROVAL',
      ratePerContainer: req.ratePerContainer || 14200,
      reason: req.weatherReason,
      weatherReason: req.weatherReason
    };

    setRerouteOrders((prev) => [newOrder, ...prev]);
    setAuditTrailCount((c) => c + 1);

    try {
      await apiService.triggerReroute({
        shipment_id: req.shipmentId,
        reason: req.weatherReason,
        proposed_route: req.toMode
      });
    } catch (e) {}

    realtimeSync.broadcast('REROUTE_TRIGGERED', 'supplier', { requestId: newId });
  };

  const approveRerouteWithDocument = async (requestId: string, adminNotes?: string) => {
    const nowStr = new Date().toLocaleString();
    const adminName = user?.name || 'System Administrator (SAP Officer)';

    let updatedDocDataUri = '';
    let updatedFilename = '';

    setRerouteOrders((prev) =>
      prev.map((o) => {
        if (o.id === requestId) {
          const docRes = generateReroutePDF({
            requestId: o.id,
            shipmentId: o.shipmentId,
            supplierName: o.supplierName,
            fromMode: o.fromMode,
            toMode: o.toMode,
            containers: o.containers,
            weatherReason: o.reason || o.weatherReason || 'Weather Emergency Bypass Approved',
            approvedBy: adminName,
            approvedAt: nowStr,
            costSavings: '₹ 4.8 Lakhs Net Savings',
            timeSavings: '12 Hours Delay Avoided'
          });

          updatedDocDataUri = docRes.dataUri;
          updatedFilename = docRes.filename;

          return {
            ...o,
            status: 'ACCEPTED',
            approvedBy: adminName,
            approvedAt: nowStr,
            documentDataUri: docRes.dataUri,
            documentFilename: docRes.filename
          };
        }
        return o;
      })
    );

    // Update shipment status to Rerouted
    setClientShipments((prev) =>
      prev.map((s) => ({
        ...s,
        status: 'Rerouted',
        rerouteApproved: true,
        costSavingsLakhs: 4.8,
        co2SavingsTons: 14.2,
      }))
    );

    try {
      await apiService.approveReroute(requestId);
    } catch (err) {}

    setAuditTrailCount((c) => c + 1);
    realtimeSync.broadcast('REROUTE_APPROVED', 'admin', { requestId, adminName });
  };

  const approveRerouteRequest = async (requestId: string) => {
    await approveRerouteWithDocument(requestId);
  };

  const revokeRerouteOrder = async (requestId: string) => {
    setRerouteOrders((prev) =>
      prev.map((o) => (o.id === requestId ? { ...o, status: 'REVERTED' } : o))
    );

    setClientShipments((prev) =>
      prev.map((s) => ({
        ...s,
        status: 'Delayed',
        rerouteApproved: false,
        costSavingsLakhs: 0,
        co2SavingsTons: 0,
      }))
    );

    setAuditTrailCount((c) => c + 1);
    realtimeSync.broadcast('SHIPMENT_STATUS_UPDATED', 'admin', { requestId, action: 'REVOKE_REROUTE' });
  };

  const rejectRerouteRequest = async (requestId: string) => {
    setRerouteOrders((prev) =>
      prev.map((o) => (o.id === requestId ? { ...o, status: 'REJECTED' } : o))
    );
    try {
      await apiService.rejectReroute(requestId);
    } catch (err) {}
    setAuditTrailCount((c) => c + 1);
    realtimeSync.broadcast('REROUTE_REJECTED', 'admin', { requestId });
  };

  const toggleRerouteApproval = async (shipmentId: string) => {
    const matchingReq = rerouteOrders.find((r) => r.shipmentId === shipmentId);
    if (matchingReq) {
      await approveRerouteWithDocument(matchingReq.id);
    } else {
      setClientShipments((prev) =>
        prev.map((s) => {
          if (s.id === shipmentId) {
            const updatedApproval = !s.rerouteApproved;
            return {
              ...s,
              rerouteApproved: updatedApproval,
              status: updatedApproval ? 'Rerouted' : 'Delayed',
              costSavingsLakhs: updatedApproval ? 3.5 : 0,
              co2SavingsTons: updatedApproval ? 11.2 : 0,
            };
          }
          return s;
        })
      );
    }
    setAuditTrailCount((c) => c + 1);
    realtimeSync.broadcast('REROUTE_TRIGGERED', 'admin', { shipmentId });
  };

  const updateFleetStatus = (fleetId: string, status: SupplierFleet['status'], utilized: number) => {
    setSupplierFleets((prev) =>
      prev.map((f) => (f.id === fleetId ? { ...f, status, utilizedContainers: utilized } : f))
    );
    setAuditTrailCount((c) => c + 1);
    realtimeSync.broadcast('SHIPMENT_STATUS_UPDATED', 'supplier', { fleetId, status, utilized });
  };

  const acceptRerouteOrder = (orderId: string) => {
    approveRerouteWithDocument(orderId);
  };

  const triggerEmergencyOverride = async (corridor: string) => {
    try {
      const firstShipment = clientShipments[0];
      if (firstShipment) {
        await apiService.triggerReroute({
          shipment_id: firstShipment.id,
          reason: `Emergency disruption declared on corridor: ${corridor}`
        });
        await refreshData();
      }
    } catch (e) {
      setClientShipments((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'Rerouted',
          riskLevel: 'Low',
          rerouteApproved: true,
        }))
      );
    }
    setAuditTrailCount((c) => c + 5);
    realtimeSync.broadcast('REROUTE_APPROVED', 'admin', { corridor });
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        clientShipments,
        supplierFleets,
        rerouteOrders,
        backendRerouteRequests,
        transparencyEnabled,
        setTransparencyEnabled,
        toggleRerouteApproval,
        approveRerouteRequest,
        approveRerouteWithDocument,
        revokeRerouteOrder,
        submitRerouteRequest,
        rejectRerouteRequest,
        updateFleetStatus,
        acceptRerouteOrder,
        triggerEmergencyOverride,
        refreshData,
        auditTrailCount,
        lastLiveEvent,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

