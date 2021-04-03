export interface ClientBroadcaster {
  emit(event: string, data: Record<string, unknown>): Promise<void>;
}
