import axios from 'axios'
import Harvest from '../Entities/Harvest'
import TimeEntryInterface from '../Entities/Interfaces/TimeEntryInterface'
import ExternalReferenceInterface from '../Entities/Interfaces/ExternalReferenceInterface';

const saveNewTimeEntry = async (timeEntry: TimeEntryInterface): Promise<TimeEntryInterface> => {
  const harvest = new Harvest()

  const body = {
    project_id: timeEntry.projectId,
    task_id: timeEntry.taskId,
    spent_date: timeEntry.date,
    external_reference: timeEntry.external_reference,
    notes: timeEntry.notes
  }

  let timeEntryResponse: any
  try {
    timeEntryResponse = await axios.post(
      'https://api.harvestapp.com/v2/time_entries',
      body,
      { headers: harvest.headers }
    )
  } catch (err) {
    console.log(err)
  }

  const createdTimeEntry: TimeEntryInterface = {
    id: timeEntryResponse.data.id,
    projectId: timeEntryResponse.data.project.id,
    date: timeEntryResponse.data.spent_date,
    taskId: timeEntryResponse.data.task.id,
    notes: timeEntryResponse.data.notes,
    external_reference: timeEntryResponse.data.newExternalReference,
    isRunning: timeEntryResponse.data.is_running
  }

  return createdTimeEntry
}

export default saveNewTimeEntry
