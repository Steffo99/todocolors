use serde::{Serialize, Deserialize};

/// A task that can be displayed on the board.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Task {
    pub text: String,
    pub icon: TaskIcon,
    pub importance: TaskImportance,
    pub priority: TaskPriority,
    pub status: TaskStatus,
}

/// Possible icons for a [`Task`].
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum TaskIcon {
    User,
    Image,
    Envelope,
    Star,
    Heart,
    Comment,
    FaceSmile,
    File,
    Bell,
    Bookmark,
    Eye,
    Hand,
    PaperPlane,
    Handshake,
    Sun,
    Clock,
    Circle,
    Square,
    Building,
    Flag,
    Moon,
}

/// The importance of a [`Task`] (how much it matters).
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskImportance {
    Highest,
    High,
    Normal,
    Low,
    Lowest,
}

/// The priority of a [`Task`] (how soon it should be completed).
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskPriority {
    Highest,
    High,
    Normal,
    Low,
    Lowest,
}

/// The status a [`Task`] is currently in.
#[derive(Copy, Clone, Debug, Serialize, Deserialize)]
pub enum TaskStatus {
    Unfinished,
    InProgress,
    Complete,
}
