import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

export interface Todo {
  task: string;
  priority: number;
  createdAt: number;
  deletado: number
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<Todo>;

  private todos: Observable<Todo[]>;


  constructor(db: AngularFirestore) {

    this.todosCollection = db.collection<Todo>('todos', ref => ref.where("deletado", '==', 0));

    
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          // console.log(a);
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  getTodos() {
    // console.log(this.todosCollection);
    return this.todos;
  }

  getTodo(id) {
    return this.todosCollection.doc<Todo>(id).valueChanges();
  }

  updateTodo(todo: Todo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: Todo) {
    return this.todosCollection.add(todo);
  }

  removeTodo(id) {
    // console.log('entrei aqui');
    // return this.todosCollection.doc(id).delete();
    return this.todosCollection.doc(id).update({ deletado: 1 });
  }

}
