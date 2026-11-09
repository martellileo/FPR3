import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, Priority, UpdateTaskDto } from './task.dto';

interface TaskRecord {
  id: number;
  userId: number;
  title: string;
  description: string;
  priority: Priority;
  done: boolean;
}

export type PublicTask = Omit<TaskRecord, 'userId'>;

const toPublic = ({ userId, ...task }: TaskRecord): PublicTask => task;

@Injectable()
export class TasksService {
  private nextId = 7;

  // Cada usuário só enxerga as próprias tarefas (userId = sub do JWT).
  private tasks: TaskRecord[] = [
    { id: 1, userId: 2, title: 'Estudar signals', description: 'Revisar signal, computed e effect', priority: 'alta', done: false },
    { id: 2, userId: 2, title: 'Implementar o interceptor', description: 'Anexar o Bearer token nas requisições', priority: 'alta', done: true },
    { id: 3, userId: 2, title: 'Criar os guards', description: 'authGuard, adminGuard e guestGuard', priority: 'media', done: false },
    { id: 4, userId: 2, title: 'Revisar o roteamento', description: 'Lazy loading e parâmetros de rota', priority: 'baixa', done: false },
    { id: 5, userId: 1, title: 'Corrigir as avaliações', description: '', priority: 'media', done: false },
    { id: 6, userId: 3, title: 'Entregar o trabalho de mobile', description: 'Prazo na sexta-feira', priority: 'alta', done: false },
  ];

  findAll(userId: number): PublicTask[] {
    return this.tasks.filter((t) => t.userId === userId).map(toPublic);
  }

  findOne(id: number, userId: number): PublicTask {
    return toPublic(this.getOwned(id, userId));
  }

  create(userId: number, dto: CreateTaskDto): PublicTask {
    const task: TaskRecord = {
      id: this.nextId++,
      userId,
      title: dto.title,
      description: dto.description ?? '',
      priority: dto.priority,
      done: false,
    };
    this.tasks.push(task);
    return toPublic(task);
  }

  update(id: number, userId: number, dto: UpdateTaskDto): PublicTask {
    const task = this.getOwned(id, userId);
    task.title = dto.title;
    task.description = dto.description ?? '';
    task.priority = dto.priority;
    task.done = dto.done;
    return toPublic(task);
  }

  remove(id: number, userId: number): void {
    const task = this.getOwned(id, userId);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  private getOwned(id: number, userId: number): TaskRecord {
    const task = this.tasks.find((t) => t.id === id && t.userId === userId);
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    return task;
  }
}
