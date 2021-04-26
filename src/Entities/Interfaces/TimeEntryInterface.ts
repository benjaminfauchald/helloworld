import ExternalReferenceInterface from "./ExternalReferenceInterface";

interface TimeEntryInterface {
  id?: number,
  projectId: number,
  taskId: number,
  date: string,
  notes: string,
  external_reference: ExternalReferenceInterface,
  isRunning?: boolean
}

export default TimeEntryInterface