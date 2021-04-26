import TaskInterface from "./TaskInterface";

interface ProjectInterface {
  id: number,
  name: string,
  code: string,
  tasks: TaskInterface[]
}

export default ProjectInterface
