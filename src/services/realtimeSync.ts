// Real-Time Multi-Device & Cross-Tab Synchronization Engine
// Uses BroadcastChannel API + LocalStorage Events to synchronize 
// actions instantly across 3+ mobile devices/tabs (Admin, Supplier, Consumer).

export interface SyncEvent {
  type: 'REROUTE_TRIGGERED' | 'REROUTE_APPROVED' | 'REROUTE_REJECTED' | 'SHIPMENT_STATUS_UPDATED' | 'ORDER_CREATED' | 'NOTIFICATION_ADDED';
  timestamp: string;
  senderRole: 'admin' | 'supplier' | 'customer';
  payload: any;
}

type SyncCallback = (event: SyncEvent) => void;

class RealtimeSyncEngine {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<SyncCallback> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('smartevac_realtime_sync');
      this.channel.onmessage = (msgEvent) => {
        this.notifyListeners(msgEvent.data);
      };
    }

    // Storage fallback for cross-window events
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'smartevac_realtime_event' && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            this.notifyListeners(parsed);
          } catch (err) {
            console.error("Storage sync parse error:", err);
          }
        }
      });
    }
  }

  public subscribe(callback: SyncCallback): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(event: SyncEvent) {
    this.listeners.forEach((cb) => {
      try {
        cb(event);
      } catch (err) {
        console.error("Error in sync listener:", err);
      }
    });
  }

  public broadcast(type: SyncEvent['type'], senderRole: SyncEvent['senderRole'], payload: any) {
    const event: SyncEvent = {
      type,
      timestamp: new Date().toISOString(),
      senderRole,
      payload
    };

    // 1. BroadcastChannel API for open tabs/windows
    if (this.channel) {
      this.channel.postMessage(event);
    }

    // 2. Storage event trigger for external mobile windows
    try {
      localStorage.setItem('smartevac_realtime_event', JSON.stringify(event));
    } catch (e) {}

    // 3. Notify local device listeners
    this.notifyListeners(event);
  }
}

export const realtimeSync = new RealtimeSyncEngine();
