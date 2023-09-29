/**
 * A simplification of the `started_on`, `completed_on` and `journaled_on` fields of a {@link Task}.
 */
export enum TaskSimplifiedStatus {
    NonExistent = -1,
    Unfinished = 0,
    InProgress = 1,
    Complete = 2,
    Journaled = 3,
}
