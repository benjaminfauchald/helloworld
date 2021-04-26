import ProjectInterface from './Interfaces/ProjectInterface'
import TaskInterface from './Interfaces/TaskInterface'

class Project implements Project{
  public id: number
  public name: string
  public code: string
  public tasks: TaskInterface[]

  constructor (props: ProjectInterface) {
    this.id = props.id
    this.name = props.name
    this.code = props.code
    this.tasks = props.tasks

  }

  get props (): ProjectInterface {
    return {
      id: this.id,
      name: this.name,
      tasks: this.tasks,
      code: this.code
    }
  }
}

export default Project
