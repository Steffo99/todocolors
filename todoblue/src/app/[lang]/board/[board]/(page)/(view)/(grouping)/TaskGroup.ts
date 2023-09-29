import {TaskWithId} from "@/app/[lang]/board/[board]/(page)/(task)/TaskWithId"


export type TaskGroup<K> = {
    k: K,
    tasks: TaskWithId[],
}
